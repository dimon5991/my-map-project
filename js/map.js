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

  // Search by country, region and mine name; all fields are optional.
  async function searchPlace(fields, status, form) {
    const country = fields.country.trim();
    const region = fields.region.trim();
    const mine = fields.mine.trim();
    const query = [mine, region, country].filter(Boolean).join(", ");

    if (!query) {
      status.textContent = "Вкажи хоча б країну, регіон або назву шахти.";
      return;
    }

    const coordinateMatch = query.match(/^\s*(-?\d+(?:[.,]\d+)?)\s*[,; ]\s*(-?\d+(?:[.,]\d+)?)\s*$/);
    if (coordinateMatch) {
      const lat = Number(coordinateMatch[1].replace(",", "."));
      const lng = Number(coordinateMatch[2].replace(",", "."));
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        map.setView([lat, lng], 12);
        addMarker([lat, lng], true, "Знайдені координати").openPopup();
        status.textContent = "Перейшов до координат: " + lat + ", " + lng;
      } else {
        status.textContent = "Координати поза допустимими межами. Широта: −90…90, довгота: −180…180.";
      }
      return;
    }

    const submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true;
    status.textContent = "Шукаю: " + query + "…";
    try {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("q", query);
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("limit", "5");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("namedetails", "1");
      const response = await fetch(url.toString(), { headers: { "Accept-Language": "uk,en" } });
      if (!response.ok) throw new Error("Сервіс пошуку тимчасово недоступний.");
      const results = await response.json();
      if (!results.length) {
        status.textContent = "Нічого не знайдено. Спробуй англійське написання назви або інший варіант.";
        document.getElementById("place-search-results").replaceChildren();
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
        const label = result.name || result.display_name.split(",")[0];
        addMarker([lat, lng], true, label).openPopup();
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

      const modeSwitch = L.DomUtil.create("div", "place-search-modes", panel);
      modeSwitch.setAttribute("role", "group");
      modeSwitch.setAttribute("aria-label", "Спосіб пошуку");
      const nameModeButton = L.DomUtil.create("button", "place-search-mode is-active", modeSwitch);
      nameModeButton.type = "button";
      nameModeButton.textContent = "Країна / шахта";
      nameModeButton.setAttribute("aria-pressed", "true");
      const coordinateModeButton = L.DomUtil.create("button", "place-search-mode", modeSwitch);
      coordinateModeButton.type = "button";
      coordinateModeButton.textContent = "Координати";
      coordinateModeButton.setAttribute("aria-pressed", "false");

      const nameForm = L.DomUtil.create("form", "place-search-form", panel);
      const fields = [
        { key: "country", label: "Країна", placeholder: "Наприклад, Chile" },
        { key: "region", label: "Регіон / область", placeholder: "Наприклад, Antofagasta" },
        { key: "mine", label: "Назва шахти", placeholder: "Наприклад, Escondida mine" }
      ];
      const inputs = {};

      fields.forEach((field) => {
        const label = L.DomUtil.create("label", "place-search-field", nameForm);
        label.textContent = field.label;
        const input = L.DomUtil.create("input", "place-search-input", label);
        input.type = "text";
        input.placeholder = field.placeholder;
        input.autocomplete = "off";
        input.name = field.key;
        input.setAttribute("aria-label", field.label);
        inputs[field.key] = input;
      });

      const nameButton = L.DomUtil.create("button", "place-search-submit", nameForm);
      nameButton.type = "submit";
      nameButton.textContent = "Знайти шахту";

      const coordinateForm = L.DomUtil.create("form", "place-search-form coordinate-search-form", panel);
      coordinateForm.hidden = true;
      const latitudeLabel = L.DomUtil.create("label", "place-search-field", coordinateForm);
      latitudeLabel.textContent = "Широта (latitude)";
      const latitudeInput = L.DomUtil.create("input", "place-search-input", latitudeLabel);
      latitudeInput.type = "number";
      latitudeInput.min = "-90";
      latitudeInput.max = "90";
      latitudeInput.step = "any";
      latitudeInput.placeholder = "Наприклад, -22.454";
      latitudeInput.setAttribute("aria-label", "Широта");
      latitudeInput.required = true;

      const longitudeLabel = L.DomUtil.create("label", "place-search-field", coordinateForm);
      longitudeLabel.textContent = "Довгота (longitude)";
      const longitudeInput = L.DomUtil.create("input", "place-search-input", longitudeLabel);
      longitudeInput.type = "number";
      longitudeInput.min = "-180";
      longitudeInput.max = "180";
      longitudeInput.step = "any";
      longitudeInput.placeholder = "Наприклад, -68.929";
      longitudeInput.setAttribute("aria-label", "Довгота");
      longitudeInput.required = true;

      const coordinateButton = L.DomUtil.create("button", "place-search-submit", coordinateForm);
      coordinateButton.type = "submit";
      coordinateButton.textContent = "Перейти до координат";

      const status = L.DomUtil.create("div", "place-search-status", panel);
      status.setAttribute("role", "status");
      status.textContent = "Заповни країну, регіон або назву шахти.";

      const results = L.DomUtil.create("div", "place-search-results", panel);
      results.id = "place-search-results";

      function setSearchMode(mode) {
        const byCoordinates = mode === "coordinates";
        nameForm.hidden = byCoordinates;
        coordinateForm.hidden = !byCoordinates;
        nameModeButton.classList.toggle("is-active", !byCoordinates);
        coordinateModeButton.classList.toggle("is-active", byCoordinates);
        nameModeButton.setAttribute("aria-pressed", String(!byCoordinates));
        coordinateModeButton.setAttribute("aria-pressed", String(byCoordinates));
        results.replaceChildren();
        status.textContent = byCoordinates
          ? "Введи широту й довготу в десятковому форматі."
          : "Заповни країну, регіон або назву шахти.";
      }

      nameModeButton.addEventListener("click", () => setSearchMode("name"));
      coordinateModeButton.addEventListener("click", () => setSearchMode("coordinates"));

      nameForm.addEventListener("submit", (event) => {
        event.preventDefault();
        searchPlace({
          country: inputs.country.value,
          region: inputs.region.value,
          mine: inputs.mine.value
        }, status, nameForm);
      });

      coordinateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const lat = Number(latitudeInput.value);
        const lng = Number(longitudeInput.value);
        if (!latitudeInput.value.trim() || !longitudeInput.value.trim() ||
            !Number.isFinite(lat) || !Number.isFinite(lng) ||
            lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          status.textContent = "Перевір координати: широта від −90 до 90, довгота від −180 до 180.";
          return;
        }

        map.setView([lat, lng], 12);
        addMarker([lat, lng], true, "Мітка за координатами").openPopup();
        status.textContent = "Перейшов до координат: " + lat.toFixed(6) + ", " + lng.toFixed(6);
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
