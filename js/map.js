(() => {
  "use strict";

  const mapElement = document.getElementById("map");
  if (!mapElement || typeof L === "undefined") return;

  const STORAGE_KEY = "my-map-project-saved-markers";
  const API_URL = "https://my-map-project-api.dimon5991.workers.dev/";
  let stateSha = null;
  let saveTimer = null;
  let saveChain = Promise.resolve();
  let loadingSharedState = false;
  let sharedStateLoaded = false;
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
        item.lat >= -90 && item.lat <= 90 && item.lng >= -180 && item.lng <= 180)
        .map((item) => ({ ...item, id: item.id || makeId(), label: item.label || "" }));
    } catch (error) {
      console.warn("Не вдалося прочитати збережені мітки:", error);
      return [];
    }
  }

  function makeId() {
    return (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : "obj-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
  }

  function markerRecords() {
    return markers.map((marker) => {
      const point = marker.getLatLng();
      return {
        id: marker._syncId || (marker._syncId = makeId()),
        lat: point.lat,
        lng: point.lng,
        locked: marker.dragging ? !marker.dragging.enabled() : true,
        label: marker._syncLabel || ""
      };
    });
  }

  function saveMarkers() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(markerRecords()));
    } catch (error) {
      console.warn("Не вдалося зберегти локальний кеш міток:", error);
    }
    if (!loadingSharedState) scheduleSharedSave();
  }

  function scheduleSharedSave() {
    if (loadingSharedState) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveChain = saveChain.then(saveSharedState).catch((error) => {
        console.error("Не вдалося синхронізувати карту:", error);
      });
    }, 600);
  }

  async function saveSharedState() {
    const payloadState = {
      version: 1,
      markers: markerRecords(),
      mines: mineMarkers.map((entry) => entry.data)
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: payloadState, baseSha: stateSha })
    });

    const result = await response.json().catch(() => ({}));
    if (response.status === 409 || result.conflict) {
      alert("Карта вже змінена на іншому пристрої. Щоб не перезаписати чужі зміни, оновіть сторінку та повторіть дію.");
      throw new Error(result.error || "Конфлікт версій спільних даних.");
    }
    if (!response.ok || !result.ok) {
      alert("Не вдалося зберегти зміни на сервері. Перевірте з'єднання та спробуйте ще раз.");
      throw new Error(result.error || "Помилка збереження спільних даних.");
    }

    stateSha = result.sha;
  }

  function addMineToMap(mine) {
    if (!mine || !mine.coordinates) return;
    const lat = Number(mine.coordinates.latitude);
    const lng = Number(mine.coordinates.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) ||
        lat < -90 || lat > 90 || lng < -180 || lng > 180) return;

    const marker = L.marker([lat, lng], {
      title: mine.name || "Мідний об'єкт",
      alt: mine.name || "Мідний об'єкт"
    }).addTo(map);
    marker.bindPopup(createMinePopup(mine), { maxWidth: 340, minWidth: 260 });
    mineMarkers.push({ data: mine, marker });
  }

  async function loadSharedState() {
    loadingSharedState = true;
    try {
      const response = await fetch(API_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const result = await response.json();
      if (!result.ok || !result.state) throw new Error("Некоректна відповідь API.");
      sharedStateLoaded = true;
      stateSha = result.sha || null;
      const state = result.state;

      // If shared mines exist, they replace the bundled starting data.
      if (Array.isArray(state.mines) && state.mines.length > 0) {
        mineMarkers.forEach((entry) => map.removeLayer(entry.marker));
        mineMarkers.length = 0;
        state.mines.forEach(addMineToMap);
        window.COPPER_MINES = state.mines.slice();
      }

      // Server markers are authoritative. For a new empty store, migrate local markers.
      markers.forEach((marker) => map.removeLayer(marker));
      markers = [];
      const savedMarkers = stateSha
        ? state.markers
        : readSavedMarkers();

      savedMarkers.forEach((point) => {
        const marker = addMarker(
          [point.lat, point.lng], false, point.label || undefined,
          point.locked === true, point.id
        );
        marker._syncLabel = point.label || "";
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(markerRecords()));
      } catch (_) {}
    } catch (error) {
      console.error("Не вдалося завантажити спільну карту:", error);
      alert("Не вдалося завантажити спільні дані. Карта може показувати лише локальні дані цього пристрою.");
    } finally {
      loadingSharedState = false;
      if (sharedStateLoaded && !stateSha) scheduleSharedSave();
    }
  }

  function formatCoordinates(latlng) {
    return { latitude: latlng.lat.toFixed(6), longitude: latlng.lng.toFixed(6) };
  }

  function addMarkerLockControl(container, marker, label, popupFactory) {
    if (!marker.dragging) return;
    const lockButton = document.createElement("button");
    lockButton.type = "button";
    lockButton.className = "marker-lock-button";
    const updateLabel = () => {
      lockButton.textContent = marker.dragging.enabled() ? "🔒 Зафіксувати мітку" : "🔓 Розблокувати мітку";
    };
    updateLabel();
    lockButton.addEventListener("click", () => {
      if (marker.dragging.enabled()) marker.dragging.disable();
      else marker.dragging.enable();
      saveMarkers();
      updateLabel();
      if (popupFactory) marker.setPopupContent(popupFactory());
      marker.openPopup();
    });
    container.appendChild(lockButton);
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
    addMarkerLockControl(wrapper, marker, label, () => coordinatesPopup(marker, label));

    const createCardButton = document.createElement("button");
    createCardButton.type = "button";
    createCardButton.className = "mine-edit-button";
    createCardButton.textContent = "Створити картку об'єкта";
    createCardButton.addEventListener("click", () => {
      marker.setPopupContent(createObjectForm(marker, label));
      marker.openPopup();
    });
    wrapper.appendChild(createCardButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "marker-delete-button";
    deleteButton.textContent = "Видалити мітку";
    deleteButton.addEventListener("click", () => {
      map.closePopup();
      map.removeLayer(marker);
      markers = markers.filter((item) => item !== marker);
      const linkedMine = mineMarkers.find((entry) => entry.marker === marker);
      if (linkedMine) {
        mineMarkers.splice(mineMarkers.indexOf(linkedMine), 1);
        window.COPPER_MINES = mineMarkers.map((entry) => entry.data);
      }
      saveMarkers();
    });
    wrapper.appendChild(deleteButton);
    return wrapper;
  }

  function addMarker(latlng, shouldSave, label, locked = false, id = null) {
    const marker = L.marker(latlng, { draggable: !locked }).addTo(map);
    marker._syncId = id || makeId();
    marker._syncLabel = label || "";
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


  // Copper mine records loaded from country data files.
  function createMinePopup(mine) {
    const card = document.createElement("section");
    card.className = "mine-card";

    const title = document.createElement("h3");
    title.className = "mine-card-title";
    title.textContent = mine.name;
    card.appendChild(title);

    const subtitle = document.createElement("div");
    subtitle.className = "mine-card-subtitle";
    subtitle.textContent = [mine.region, mine.country].filter(Boolean).join(", ");
    card.appendChild(subtitle);

    const fields = [
      ["Власник", mine.owner],
      ["Поточний стан", mine.status],
      ["Процес", mine.process],
      ["Тип родовища", mine.depositType],
      ["Тип руди", mine.oreType],
      ["Інші метали", Array.isArray(mine.otherMetals) ? mine.otherMetals.join(", ") : mine.otherMetals],
      ["Координати", Number(mine.coordinates.latitude).toFixed(6) + " " + Number(mine.coordinates.longitude).toFixed(6)]
    ];

    const table = document.createElement("dl");
    table.className = "mine-card-fields";
    fields.forEach(([label, value]) => {
      if (value === undefined || value === null || value === "") return;
      const row = document.createElement("div");
      row.className = "mine-card-row";
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = String(value);
      row.append(term, detail);
      table.appendChild(row);
    });
    card.appendChild(table);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "mine-edit-button";
    editButton.textContent = "Редагувати картку";
    editButton.addEventListener("click", () => {
      const mineEntry = mineMarkers.find((item) => item.data.id === mine.id);
      const mineMarker = mineEntry ? mineEntry.marker : null;
      if (!mineMarker) return;
      const form = document.createElement("form");
      form.className = "mine-edit-form";
      const fields = [
        ["name", "Назва"], ["country", "Країна"], ["region", "Регіон"],
        ["owner", "Власник"], ["status", "Поточний стан"], ["process", "Процес"],
        ["depositType", "Тип родовища"], ["oreType", "Тип руди"],
        ["otherMetals", "Інші метали (через кому)"],
        ["latitude", "Широта"], ["longitude", "Довгота"]
      ];
      const inputs = {};
      const heading = document.createElement("h3");
      heading.className = "mine-card-title";
      heading.textContent = "Редагування: " + mine.name;
      form.appendChild(heading);
      fields.forEach(([key, fieldLabel]) => {
        const label = document.createElement("label");
        label.className = "place-search-field";
        label.textContent = fieldLabel;
        const input = document.createElement("input");
        input.className = "place-search-input";
        input.name = key;
        input.type = ["latitude", "longitude"].includes(key) ? "number" : "text";
        if (input.type === "number") input.step = "any";
        let value = mine[key];
        if (key === "otherMetals") value = Array.isArray(value) ? value.join(", ") : (value || "");
        if (key === "latitude") value = mine.coordinates.latitude;
        if (key === "longitude") value = mine.coordinates.longitude;
        input.value = value == null ? "" : String(value);
        input.required = ["name", "country", "region", "latitude", "longitude"].includes(key);
        label.appendChild(input);
        form.appendChild(label);
        inputs[key] = input;
      });
      const message = document.createElement("p");
      message.className = "place-search-status";
      message.textContent = "Поки що зміни діятимуть лише до перезавантаження сторінки.";
      form.appendChild(message);
      const save = document.createElement("button");
      save.type = "submit";
      save.className = "mine-edit-save";
      save.textContent = "Застосувати";
      form.appendChild(save);
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "mine-edit-cancel";
      cancel.textContent = "Скасувати";
      cancel.addEventListener("click", () => {
        mineMarker.setPopupContent(createMinePopup(mine));
        mineMarker.openPopup();
      });
      form.appendChild(cancel);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const latitude = Number(inputs.latitude.value);
        const longitude = Number(inputs.longitude.value);
        if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
            !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
          message.textContent = "Перевірте координати: широта від −90 до 90, довгота від −180 до 180.";
          return;
        }
        Object.assign(mine, {
          name: inputs.name.value.trim(), country: inputs.country.value.trim(),
          region: inputs.region.value.trim(), owner: inputs.owner.value.trim(),
          status: inputs.status.value.trim(), process: inputs.process.value.trim(),
          depositType: inputs.depositType.value.trim(), oreType: inputs.oreType.value.trim(),
          otherMetals: inputs.otherMetals.value.split(",").map((v) => v.trim()).filter(Boolean),
          coordinates: { latitude, longitude }
        });
        mineMarker.setLatLng([latitude, longitude]);
        mineMarker.setPopupContent(createMinePopup(mine));
        window.COPPER_MINES = mineMarkers.map((entry) => entry.data);
        scheduleSharedSave();
        mineMarker.openPopup();
      });
      mineMarker.setPopupContent(form);
    });
    card.appendChild(editButton);
    const associatedMarker = mineMarkers.find((item) => item.data.id === mine.id);
    if (associatedMarker && markers.includes(associatedMarker.marker)) {
      addMarkerLockControl(card, associatedMarker.marker, mine.name, () => createMinePopup(mine));
    }
    return card;
  }

  function createObjectForm(marker, markerLabel) {
    const point = marker.getLatLng();
    const form = document.createElement("form");
    form.className = "mine-edit-form";
    const heading = document.createElement("h3");
    heading.className = "mine-card-title";
    heading.textContent = "Нова картка об'єкта";
    form.appendChild(heading);

    const fieldSpecs = [
      ["name", "Назва об'єкта", ""],
      ["country", "Країна", ""],
      ["region", "Регіон", ""],
      ["owner", "Власник", ""],
      ["status", "Поточний стан", ""],
      ["process", "Процес", ""],
      ["depositType", "Тип родовища", ""],
      ["oreType", "Тип руди", ""],
      ["otherMetals", "Інші метали (через кому)", ""],
      ["latitude", "Широта", point.lat],
      ["longitude", "Довгота", point.lng]
    ];
    const inputs = {};
    fieldSpecs.forEach(([key, fieldLabel, initialValue]) => {
      const label = document.createElement("label");
      label.className = "place-search-field";
      label.textContent = fieldLabel;
      const input = document.createElement("input");
      input.className = "place-search-input";
      input.name = key;
      input.type = ["latitude", "longitude"].includes(key) ? "number" : "text";
      if (input.type === "number") input.step = "any";
      input.value = initialValue === undefined || initialValue === null ? "" : String(initialValue);
      input.required = ["name", "country", "latitude", "longitude"].includes(key);
      label.appendChild(input);
      form.appendChild(label);
      inputs[key] = input;
    });

    const note = document.createElement("p");
    note.className = "place-search-status";
    note.textContent = "Картка буде синхронізована зі спільною картою.";
    form.appendChild(note);

    const createButton = document.createElement("button");
    createButton.type = "submit";
    createButton.className = "mine-edit-save";
    createButton.textContent = "Створити картку";
    form.appendChild(createButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "mine-edit-cancel";
    cancelButton.textContent = "Скасувати";
    cancelButton.addEventListener("click", () => {
      marker.setPopupContent(coordinatesPopup(marker, markerLabel));
      marker.openPopup();
    });
    form.appendChild(cancelButton);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const latitude = Number(inputs.latitude.value);
      const longitude = Number(inputs.longitude.value);
      if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
          !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
        note.textContent = "Перевірте координати: широта від −90 до 90, довгота від −180 до 180.";
        return;
      }
      const mine = {
        id: "object-" + Date.now(),
        name: inputs.name.value.trim(),
        country: inputs.country.value.trim(),
        region: inputs.region.value.trim(),
        owner: inputs.owner.value.trim(),
        status: inputs.status.value.trim(),
        process: inputs.process.value.trim(),
        depositType: inputs.depositType.value.trim(),
        oreType: inputs.oreType.value.trim(),
        otherMetals: inputs.otherMetals.value.split(",").map((value) => value.trim()).filter(Boolean),
        coordinates: { latitude, longitude }
      };
      if (!mine.name || !mine.country) {
        note.textContent = "Заповніть принаймні назву об'єкта та країну.";
        return;
      }
      marker.setLatLng([latitude, longitude]);
      mineMarkers.push({ data: mine, marker });
      if (Array.isArray(window.COPPER_MINES)) window.COPPER_MINES.push(mine);
      marker._syncLabel = mine.name;
      saveMarkers();
      scheduleSharedSave();
      marker.setPopupContent(createMinePopup(mine));
      marker.openPopup();
    });

    return form;
  }

  const mineMarkers = [];
  (Array.isArray(window.COPPER_MINES) ? window.COPPER_MINES : []).forEach(addMineToMap);

  let markerToolEnabled = false;

  const MarkerToolControl = L.Control.extend({
    options: { position: "bottomleft" },
    onAdd: function () {
      const container = L.DomUtil.create("div", "marker-tool-control");
      const button = L.DomUtil.create("button", "marker-tool-button", container);
      button.type = "button";
      button.textContent = "Увімкнути мітки";
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", "Увімкнути або вимкнути інструмент додавання міток");
      button.addEventListener("click", () => {
        markerToolEnabled = !markerToolEnabled;
        button.textContent = markerToolEnabled ? "Вимкнути мітки" : "Увімкнути мітки";
        button.setAttribute("aria-pressed", String(markerToolEnabled));
        container.classList.toggle("is-active", markerToolEnabled);
        mapElement.classList.toggle("marker-tool-active", markerToolEnabled);
      });
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);
      return container;
    }
  });
  map.addControl(new MarkerToolControl());

  map.on("click", (event) => {
    if (!markerToolEnabled) return;
    addMarker(event.latlng, true).openPopup();
  });
  readSavedMarkers().forEach((point) => {
    const marker = addMarker([point.lat, point.lng], false, point.label || undefined, point.locked === true, point.id);
    marker._syncLabel = point.label || "";
  });

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
      const toggleButton = L.DomUtil.create("button", "place-search-toggle", panel);
      toggleButton.type = "button";
      toggleButton.textContent = "Згорнути пошук";
      toggleButton.setAttribute("aria-expanded", "true");
      toggleButton.setAttribute("aria-label", "Згорнути або розгорнути вікно пошуку");
      toggleButton.addEventListener("click", () => {
        const collapsed = panel.classList.toggle("is-collapsed");
        toggleButton.textContent = collapsed ? "Пошук" : "Згорнути пошук";
        toggleButton.setAttribute("aria-expanded", String(!collapsed));
      });
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



  loadSharedState();
  window.requestAnimationFrame(() => map.invalidateSize());
})();
