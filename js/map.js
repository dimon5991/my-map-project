(() => {
  "use strict";

  const mapElement = document.getElementById("map");
  if (!mapElement || typeof L === "undefined") return;

  const STORAGE_KEY = "my-map-project-saved-markers";

  const map = L.map(mapElement, {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    worldCopyJump: true,
    zoomControl: false
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);

  const streetLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }
  );

  const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      attribution: "Tiles &copy; Esri — Sources: Esri, Maxar, Earthstar Geographics and the GIS community"
    }
  );

  streetLayer.addTo(map);

  let markers = [];

  function readSavedMarkers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) return [];
      return saved.filter((item) =>
        item &&
        Number.isFinite(item.lat) &&
        Number.isFinite(item.lng) &&
        item.lat >= -90 && item.lat <= 90 &&
        item.lng >= -180 && item.lng <= 180
      );
    } catch (error) {
      console.warn("Не вдалося прочитати збережені мітки:", error);
      return [];
    }
  }

  function saveMarkers() {
    try {
      const data = markers.map((marker) => {
        const point = marker.getLatLng();
        return { lat: point.lat, lng: point.lng };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn("Не вдалося зберегти мітки у цьому браузері:", error);
    }
  }

  function formatCoordinates(latlng) {
    return {
      latitude: latlng.lat.toFixed(6),
      longitude: latlng.lng.toFixed(6)
    };
  }

  function coordinatesPopup(marker) {
    const coordinates = formatCoordinates(marker.getLatLng());
    const wrapper = document.createElement("div");
    wrapper.className = "marker-coordinates";

    const title = document.createElement("strong");
    title.textContent = "Координати мітки";
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
        navigator.clipboard.writeText(text).then(() => {
          copyButton.textContent = "Скопійовано";
        }).catch(() => {
          copyButton.textContent = text;
        });
      } else {
        copyButton.textContent = text;
      }
    });
    wrapper.appendChild(copyButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "marker-delete-button";
    deleteButton.textContent = "Видалити мітку";
    deleteButton.addEventListener("click", () => {
      map.closePopup();
      map.removeLayer(marker);
      markers = markers.filter((savedMarker) => savedMarker !== marker);
      saveMarkers();
    });
    wrapper.appendChild(deleteButton);

    return wrapper;
  }

  function addMarker(latlng, shouldSave) {
    const marker = L.marker(latlng, { draggable: true }).addTo(map);
    markers.push(marker);
    marker.bindPopup(coordinatesPopup(marker));

    marker.on("dragend", () => {
      marker.setPopupContent(coordinatesPopup(marker));
      saveMarkers();
      marker.openPopup();
    });

    if (shouldSave) saveMarkers();
    return marker;
  }

  // Клік на карту додає мітку, а координати автоматично зберігаються в цьому браузері.
  map.on("click", (event) => {
    addMarker(event.latlng, true).openPopup();
  });

  // Відновити мітки після перезавантаження сторінки.
  readSavedMarkers().forEach((point) => addMarker([point.lat, point.lng], false));

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
      container.textContent = "Клікніть на карту, щоб додати мітку. Мітки зберігаються в цьому браузері.";
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);
      return container;
    }
  });

  map.addControl(new HintControl());

  window.requestAnimationFrame(() => map.invalidateSize());
})();
