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
        return { lat: point.lat, lng: point.lng, locked: marker.dragging ? !marker.dragging.enabled() : true };
      })));
    } catch (error) {
      console.warn("Не вдалося зберегти мітки:", error);
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
      saveMarkers();
    });
    wrapper.appendChild(deleteButton);
    return wrapper;
  }

  function addMarker(latlng, shouldSave, label, locked = false) {
    const marker = L.marker(latlng, { draggable: !locked }).addTo(map);
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

    const header = document.createElement("header");
    header.className = "mine-card-header";
    const headingGroup = document.createElement("div");
    headingGroup.className = "mine-card-heading-group";
    const title = document.createElement("h3");
    title.className = "mine-card-title";
    title.textContent = mine.name || "Об’єкт";
    headingGroup.appendChild(title);
    const subtitle = document.createElement("div");
    subtitle.className = "mine-card-subtitle";
    subtitle.textContent = [mine.region, mine.country].filter(Boolean).join(" · ");
    headingGroup.appendChild(subtitle);
    const status = document.createElement("span");
    status.className = "mine-card-status";
    status.textContent = mine.status || "Статус не вказано";
    header.append(headingGroup, status);
    card.appendChild(header);

    const tabs = document.createElement("div");
    tabs.className = "mine-card-tabs";
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Розділи картки об’єкта");
    const content = document.createElement("div");
    content.className = "mine-card-content";

    const overview = document.createElement("div");
    overview.className = "mine-card-panel";
    overview.dataset.panel = "overview";
    const fields = [
      ["Тип родовища", mine.depositType],
      ["Тип руди", mine.oreType],
      ["Процес", mine.process],
      ["Інші метали", Array.isArray(mine.otherMetals) ? mine.otherMetals.join(", ") : mine.otherMetals],
      ["Координати", mine.coordinates ? Number(mine.coordinates.latitude).toFixed(6) + ", " + Number(mine.coordinates.longitude).toFixed(6) : ""]
    ];
    const fieldGrid = document.createElement("dl");
    fieldGrid.className = "mine-card-grid";
    fields.forEach(([label, value]) => {
      if (value === undefined || value === null || value === "") return;
      const item = document.createElement("div");
      item.className = "mine-card-data-item";
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = String(value);
      item.append(term, detail);
      fieldGrid.appendChild(item);
    });
    overview.appendChild(fieldGrid);

    const production = document.createElement("div");
    production.className = "mine-card-panel";
    production.dataset.panel = "production";
    const productionTitle = document.createElement("h4");
    productionTitle.className = "mine-card-section-title";
    productionTitle.textContent = "Виробництво міді";
    production.appendChild(productionTitle);
    const productionNote = document.createElement("p");
    productionNote.className = "mine-card-note";
    productionNote.textContent = "Історичні річні показники, потужності та прогноз можна додати окремим набором даних. Перевірені числові дані ще не підключено.";
    production.appendChild(productionNote);

    const logistics = document.createElement("div");
    logistics.className = "mine-card-panel";
    logistics.dataset.panel = "logistics";
    const logisticsTitle = document.createElement("h4");
    logisticsTitle.className = "mine-card-section-title";
    logisticsTitle.textContent = "Ланцюг постачання";
    logistics.appendChild(logisticsTitle);
    const stages = [
      ["01", "Видобуток", "Руда з шахти"],
      ["02", "Збагачення", "Концентрат або підготовка до SX-EW"],
      ["03", "Переробка", "Плавлення й рафінування або отримання катодів"],
      ["04", "Наступний споживач", "Завод, виробник чи торговельний партнер"]
    ];
    const route = document.createElement("ol");
    route.className = "mine-card-route";
    stages.forEach(([number, name, detail]) => {
      const item = document.createElement("li");
      const numberEl = document.createElement("span");
      numberEl.className = "mine-card-route-number";
      numberEl.textContent = number;
      const textWrap = document.createElement("div");
      const nameEl = document.createElement("strong");
      nameEl.textContent = name;
      const detailEl = document.createElement("span");
      detailEl.textContent = detail;
      textWrap.append(nameEl, detailEl);
      item.append(numberEl, textWrap);
      route.appendChild(item);
    });
    logistics.appendChild(route);
    const logisticsNote = document.createElement("p");
    logisticsNote.className = "mine-card-note";
    logisticsNote.textContent = "Схема показує можливі етапи галузевого ланцюга, а не підтверджений маршрут саме цього об’єкта.";
    logistics.appendChild(logisticsNote);

    const owners = document.createElement("div");
    owners.className = "mine-card-panel";
    owners.dataset.panel = "owners";
    const ownersTitle = document.createElement("h4");
    ownersTitle.className = "mine-card-section-title";
    ownersTitle.textContent = "Власники та частки";
    owners.appendChild(ownersTitle);
    const ownerValue = document.createElement("p");
    ownerValue.className = "mine-card-owner-value";
    ownerValue.textContent = mine.owner || "Інформацію про власників не додано.";
    owners.appendChild(ownerValue);
    const ownersNote = document.createElement("p");
    ownersNote.className = "mine-card-note";
    ownersNote.textContent = "За потреби власників можна буде рознести на окремі записи з частками, датами та джерелами.";
    owners.appendChild(ownersNote);

    const panels = { overview, production, logistics, owners };
    const tabLabels = [
      ["overview", "Огляд"],
      ["production", "Виробництво"],
      ["logistics", "Логістика"],
      ["owners", "Власники"]
    ];
    function showTab(name) {
      Object.entries(panels).forEach(([key, panel]) => { panel.hidden = key !== name; });
      Array.from(tabs.children).forEach((button) => {
        const active = button.dataset.tab === name;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
        button.tabIndex = active ? 0 : -1;
      });
    }
    tabLabels.forEach(([name, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mine-card-tab";
      button.dataset.tab = name;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", "false");
      button.tabIndex = -1;
      button.textContent = label;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        showTab(name);
      });
      tabs.appendChild(button);
    });
    content.append(overview, production, logistics, owners);
    card.append(tabs, content);

    const associatedMarker = mineMarkers.find((item) => item.data.id === mine.id);
    if (associatedMarker && markers.includes(associatedMarker.marker)) {
      addMarkerLockControl(card, associatedMarker.marker, mine.name, () => createMinePopup(mine));
    }
    showTab("overview");
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
    note.textContent = "Картка буде додана до карти в цьому сеансі. Постійне збереження в GitHub ще не підключено.";
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
      marker.setPopupContent(createMinePopup(mine));
      marker.openPopup();
    });

    return form;
  }

  const mineMarkers = [];
  (Array.isArray(window.COPPER_MINES) ? window.COPPER_MINES : []).forEach((mine) => {
    if (!mine || !mine.coordinates) return;
    const lat = Number(mine.coordinates.latitude);
    const lng = Number(mine.coordinates.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) ||
        lat < -90 || lat > 90 || lng < -180 || lng > 180) return;

    const marker = L.marker([lat, lng], {
      title: mine.name || "Мідна шахта",
      alt: mine.name || "Мідна шахта"
    }).addTo(map);
    marker.bindPopup(createMinePopup(mine), {
      className: "mine-leaflet-popup",
      maxWidth: 340,
      minWidth: 260,
      maxHeight: Math.max(180, window.innerHeight - 80),
      autoPan: true,
      autoPanPadding: [20, 20],
      keepInView: true
    });
    mineMarkers.push({ data: mine, marker });
  });

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
  readSavedMarkers().forEach((point) => addMarker([point.lat, point.lng], false, undefined, point.locked === true));

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
      panel.classList.add("is-collapsed");
      toggleButton.textContent = "Пошук";
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.setAttribute("aria-label", "Розгорнути або згорнути вікно пошуку");
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



  window.requestAnimationFrame(() => map.invalidateSize());
})();
