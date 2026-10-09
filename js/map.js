(() => {
  "use strict";

  const mapElement = document.getElementById("map");
  if (!mapElement || typeof L === "undefined") return;

  const map = L.map(mapElement, {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    worldCopyJump: true,
    zoomControl: false
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);

  // Базова вулична карта. Дотримуйтеся політики використання тайлів OSM.
  const streetLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }
  );

  // Супутникові знімки Esri; умови та вимоги до атрибуції діють для цього сервісу.
  const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      attribution: "Tiles &copy; Esri — Sources: Esri, Maxar, Earthstar Geographics and the GIS community"
    }
  );

  streetLayer.addTo(map);

  // Додавання мітки кліком. Координати показуються у спливаючому вікні;
  // мітку можна перетягувати, координати оновлюються автоматично.
  function formatCoordinates(latlng) {
    return {
      latitude: latlng.lat.toFixed(6),
      longitude: latlng.lng.toFixed(6)
    };
  }

  function coordinatesPopup(latlng) {
    const coordinates = formatCoordinates(latlng);
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

    return wrapper;
  }

  map.on("click", (event) => {
    const marker = L.marker(event.latlng, { draggable: true }).addTo(map);
    marker.bindPopup(coordinatesPopup(marker.getLatLng())).openPopup();

    marker.on("dragend", () => {
      marker.setPopupContent(coordinatesPopup(marker.getLatLng()));
      marker.openPopup();
    });
  });

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
      container.textContent = "Клікніть на карту, щоб додати мітку";
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);
      return container;
    }
  });

  map.addControl(new HintControl());

  // Коректно перерахувати розміри карти після першого відображення.
  window.requestAnimationFrame(() => map.invalidateSize());
})();
