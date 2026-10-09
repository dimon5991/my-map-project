(() => {
  "use strict";

  const mapElement = document.getElementById("map");
  if (!mapElement || typeof L === "undefined") return;

  const STORAGE_KEY = "my-map-project-saved-markers";
  const map = L.map(mapElement, { center: [20, 0], zoom: 2, minZoom: 2, worldCopyJump: true, zoomControl: false });
  L.control.zoom({ position: "bottomright" }).addTo(map);

  const streetLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  });
  const satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri — Sources: Esri, Maxar, Earthstar Geographics and the GIS community"
  });
  streetLayer.addTo(map);

  let markers = [];

  function readSavedMarkers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(saved)) return [];
      return saved.filter((item) => item && Number.isFinite(item.lat) && Number.isFinite(item.lng) &&
        item.lat >= -90 && item.lat <= 90 && item.lng >= -180 && item.lng <= 180);
    } catch (error) {
      console.warn("Не вдалося прочитати збережені мітки:", error);
      return [];
    }
  }

  function saveMarkers() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(markers.map((marker) => {
        const point = marker.getLatLng();
        return { lat: point.lat, lng: point.lng };
      })));
    } catch (error) {
      console.warn("Не вдалося зберегти мітки:", error);
    }
  }

  function formatCoordinates(latlng) {
    return { latitude: latlng.lat.toFixed(6), longitude: latlng.lng.toFixed(6) };
  }

  function coordinatesPopup(marker, label) {
    const coordinates = formatCoordinates(marker.getLatLng());
    const wrapper = document.createElement("div");
    wrapper.className = "marker-coordinates";

    const title = document.createElement("strong");
    title.textContent = label || "Координати мітки";
    wrapper.appendChild(title);

    const latitude = document.createElement("div");
    latitude.textContent = "Широта: " + coordinates.latitude;
    wrapper.appendChild(latitude);

    const longitude = document.createElement("div");
    longitude.textContent = "Довгота: " + coordinates.longitude;
    wrapper.appendChild(longitude);

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "marker-copy-button";
    copyButton.textContent = "Копіювати координати";
    copyButton.addEventListener("click", () => {
      const text = coordinates.latitude + ", " + coordinates.longitude;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => { copyButton.textContent = "Скопійовано"; })
          .catch(() => { copyButton.textContent = text; });
      } else copyButton.textContent = text;
    });
    wrapper.appendChild(copyButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "marker-delete-button";
    deleteButton.textContent = "Видалити мітку";
    deleteButton.addEventListener("click", () => {
      map.closePopup();
      map.removeLayer(marker);
      markers = markers.filter((item) => item !== marker);
      saveMarkers();
    });
    wrapper.appendChild(deleteButton);
    return wrapper;
  }

  function addMarker(latlng, shouldSave, label) {
    const marker = L.marker(latlng, { draggable: true }).addTo(map);
    markers.push(marker);
    marker.bindPopup(coordinatesPopup(marker, label));
    marker.on("dragend", () => {
      marker.setPopupContent(coordinatesPopup(marker, label));
      saveMarkers();
      marker.openPopup();
    });
    if (shouldSave) saveMarkers();
    return marker;
  }

  map.on("click", (event) => addMarker(event.latlng, true).openPopup());
  readSavedMarkers().forEach((point) => addMarker([point.lat, point.lng], false));

  // Search: first try coordinates, otherwise use a single explicit geocoding request.
  async function searchPlace(query, status, form) {
    const trimmed = query.trim();
    if (!trimmed) {
      status.textContent = "Введи назву міста, шахти або координати.";
      return;
    }

    const coordinateMatch = trimmed.match(/^\s*(-?\d+(?:[.,]\d+)?)\s*[,; ]\s*(-?\d+(?:[.,]\d+)?)\s*$/);
    if (coordinateMatch) {
      const lat = Number(coordinateMatch[1].replace(",", "."));
      const lng = Number(coordinateMatch[2].replace(",", "."));
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        map.setView([lat, lng], 12);
        const marker = addMarker([lat, lng], true, "Знайдені координати");
        marker.openPopup();
        status.textContent = "Перейшов до координат: " + lat + ", " + lng;
      } else {
        status.textContent = "Координати поза допустимими межами. Широта: −90…90, довгота: −180…180.";
      }
      return;
    }

    const submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true;
    status.textContent = "Шукаю місце…";
    try {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("q", trimmed);
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("limit", "5");
      url.searchParams.set("addressdetails", "1");
      const response = await fetch(url.toString(), { headers: { "Accept-Language": "uk,en" } });
      if (!response.ok) throw new Error("Сервіс пошуку тимчасово недоступний.");
      const results = await response.json();
      if (!results.length) {
        status.textContent = "Нічого не знайдено. Спробуй назву англійською або додай країну.";
        return;
      }

      showSearchResults(results, status);
    } catch (error) {
      status.textContent = "Не вдалося виконати пошук. Перевір інтернет-з’єднання та спробуй ще раз.";
      console.error(error);
    } finally {
      submitButton.disabled = false;
    }
  }

  function showSearchResults(results, status) {
    const list = document.getElementById("place-search-results");
    list.replaceChildren();

    results.forEach((result) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "place-search-result";
      item.textContent = result.display_name;
      item.addEventListener("click", () => {
        const lat = Number(result.lat);
        const lng = Number(result.lon);
        map.setView([lat, lng], 12);
        const marker = addMarker([lat, lng], true, result.name || result.display_name.split(",")[0]);
        marker.openPopup();
        status.textContent = "Знайдено: " + result.display_name;
        list.replaceChildren();
      });
      list.appendChild(item);
    });

    status.textContent = "Знайдено варіантів: " + results.length + ". Обери потрібний результат.";
  }

  const SearchControl = L.Control.extend({
    options: { position: "topleft" },
    onAdd: function () {
      const panel = L.DomUtil.create("div", "place-search-panel");
      const heading = L.DomUtil.create("strong", "place-search-heading", panel);
      heading.textContent = "Пошук на карті";

      const form = L.DomUtil.create("form", "place-search-form", panel);
      const input = L.DomUtil.create("input", "place-search-input", form);
      input.type = "search";
      input.placeholder = "Місто, шахта або координати";
      input.setAttribute("aria-label", "Пошук міста, шахти або координат");
      input.autocomplete = "off";

      const button = L.DomUtil.create("button", "place-search-submit", form);
      button.type = "submit";
      button.textContent = "Знайти";

      const status = L.DomUtil.create("div", "place-search-status", panel);
      status.setAttribute("role", "status");
      status.textContent = "Приклад: Santiago, Chile або -22.454, -68.929";

      const results = L.DomUtil.create("div", "place-search-results", panel);
      results.id = "place-search-results";

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        searchPlace(input.value, status, form);
      });
      L.DomEvent.disableClickPropagation(panel);
      L.DomEvent.disableScrollPropagation(panel);
      return panel;
    }
  });
  map.addControl(new SearchControl());

  const ModeControl = L.Control.extend({
    options: { position: "topright" },
    onAdd: function () {
      const container = L.DomUtil.create("div", "map-mode-control");
      container.setAttribute("aria-label", "Режим карти");
      const streetButton = this.createButton("Карта", true);
      const satelliteButton = this.createButton("Супутник", false);
      container.append(streetButton, satelliteButton);
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      streetButton.addEventListener("click", () => setMode("street"));
      satelliteButton.addEventListener("click", () => setMode("satellite"));
      function setMode(mode) {
        if (mode === "satellite") {
          if (map.hasLayer(streetLayer)) map.removeLayer(streetLayer);
          satelliteLayer.addTo(map);
        } else {
          if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
          streetLayer.addTo(map);
        }
        streetButton.setAttribute("aria-pressed", String(mode === "street"));
        satelliteButton.setAttribute("aria-pressed", String(mode === "satellite"));
      }
      return container;
    },
    createButton: function (label, active) {
      const button = L.DomUtil.create("button", "map-mode-button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("aria-pressed", String(active));
      return button;
    }
  });
  map.addControl(new ModeControl());

  const HintControl = L.Control.extend({
    options: { position: "topleft" },
    onAdd: function () {
      const container = L.DomUtil.create("div", "map-marker-hint");
      container.textContent = "Клікни на карту, щоб додати мітку. Мітки зберігаються в цьому браузері.";
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);
      return container;
    }
  });
  map.addControl(new HintControl());

  window.requestAnimationFrame(() => map.invalidateSize());
})();
