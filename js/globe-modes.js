(() => {
  "use strict";

  const map = document.getElementById("map");
  const page = document.querySelector(".map-page");
  if (!map || !page) return;

  const mineData = Array.isArray(window.COPPER_MINES) ? window.COPPER_MINES : [];
  const markerStorageKey = "my-map-project-saved-markers";
  const bhp = { name: "BHP Group", lat: -37.815158, lng: 144.968108 };
  const modes = ["leaflet", "globe", "cesium"];
  let activeMode = "leaflet";
  let globeInstance = null;
  let cesiumViewer = null;
  let cesiumHandler = null;
  let addMarkerMode = false;
  let noticeTimer = null;

  const switcher = document.createElement("nav");
  switcher.className = "view-mode-switcher";
  switcher.setAttribute("aria-label", "Режим перегляду карти");
  const buttons = {};
  [
    ["leaflet", "2D-карта"],
    ["globe", "Globe.gl"],
    ["cesium", "CesiumJS"]
  ].forEach(([mode, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "view-mode-button";
    button.textContent = label;
    button.setAttribute("aria-pressed", String(mode === activeMode));
    button.addEventListener("click", () => switchMode(mode));
    buttons[mode] = button;
    switcher.appendChild(button);
  });
  page.appendChild(switcher);

  const globeStage = document.createElement("section");
  globeStage.id = "globe-stage";
  globeStage.className = "globe-stage";
  globeStage.hidden = true;
  globeStage.setAttribute("aria-label", "Інтерактивний 3D-глобус");
  const globeCanvas = document.createElement("div");
  globeCanvas.id = "globe-globe";
  globeCanvas.className = "globe-canvas";
  const cesiumCanvas = document.createElement("div");
  cesiumCanvas.id = "cesium-globe";
  cesiumCanvas.className = "globe-canvas";
  cesiumCanvas.hidden = true;
  const tools = document.createElement("aside");
  tools.className = "globe-tools";
  tools.innerHTML = '<label class="globe-search-label" for="globe-search">Пошук об’єкта</label>' +
    '<form class="globe-search-form" id="globe-search-form"><input id="globe-search" class="globe-search-input" placeholder="Шахта, країна або регіон" autocomplete="off"><button type="submit">Знайти</button></form>' +
    '<div class="globe-tool-row"><button type="button" id="globe-add-marker" class="globe-secondary-button" aria-pressed="false">＋ Додати мітку</button><button type="button" id="globe-home" class="globe-secondary-button">Огляд світу</button></div>' +
    '<p id="globe-status" class="globe-status" role="status">Оберіть об’єкт на глобусі або скористайтеся пошуком.</p>' +
    '<div id="globe-results" class="globe-results"></div>';
  const details = document.createElement("div");
  details.className = "globe-details-backdrop";
  details.hidden = true;
  details.innerHTML = '<section class="globe-details" role="dialog" aria-modal="true" aria-labelledby="globe-details-title"><button type="button" class="globe-details-close" aria-label="Закрити картку">×</button><h2 id="globe-details-title"></h2><p class="globe-details-subtitle"></p><dl class="globe-details-fields"></dl></section>';
  details.querySelector(".globe-details-close").addEventListener("click", () => { details.hidden = true; });
  details.addEventListener("click", event => { if (event.target === details) details.hidden = true; });
  globeStage.append(globeCanvas, cesiumCanvas, tools, details);
  page.appendChild(globeStage);

  function getSavedMarkers() {
    try {
      const data = JSON.parse(localStorage.getItem(markerStorageKey) || "[]");
      return Array.isArray(data) ? data.filter(p => p && Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lng)) &&
        Number(p.lat) >= -90 && Number(p.lat) <= 90 && Number(p.lng) >= -180 && Number(p.lng) <= 180)
        .map(p => ({ lat: Number(p.lat), lng: Number(p.lng), name: p.name || "Власна мітка" })) : [];
    } catch (_) { return []; }
  }

  function saveMarker(lat, lng) {
    const markers = getSavedMarkers();
    markers.push({ lat: Number(lat), lng: Number(lng), name: "Власна мітка " + (markers.length + 1) });
    try { localStorage.setItem(markerStorageKey, JSON.stringify(markers)); } catch (_) {}
    refreshGlobeData();
    showStatus("Мітку збережено в цьому браузері. Вона залишиться після оновлення сторінки.");
  }

  function allPoints() {
    const mines = mineData.filter(m => m && m.coordinates && Number.isFinite(Number(m.coordinates.latitude)) &&
      Number.isFinite(Number(m.coordinates.longitude))).map(m => ({
      id: m.id, name: m.name || "Мідний об’єкт", country: m.country || "", region: m.region || "",
      owner: m.owner || "", status: m.status || "", process: m.process || "",
      depositType: m.depositType || "", oreType: m.oreType || "",
      otherMetals: Array.isArray(m.otherMetals) ? m.otherMetals.join(", ") : (m.otherMetals || ""),
      lat: Number(m.coordinates.latitude), lng: Number(m.coordinates.longitude), kind: "mine", source: m
    }));
    const custom = getSavedMarkers().map((m, i) => ({ id: "custom-" + i, name: m.name, country: "", region: "",
      owner: "", status: "Власна мітка", process: "", depositType: "", oreType: "", otherMetals: "",
      lat: m.lat, lng: m.lng, kind: "custom" }));
    return [...mines, ...custom, { id: "bhp-office", name: "BHP Group", country: "Австралія",
      region: "Melbourne", owner: "Корпоративний офіс", status: "Офіс компанії", lat: bhp.lat, lng: bhp.lng, kind: "owner" }];
  }

  function showStatus(message) {
    const status = document.getElementById("globe-status");
    if (status) status.textContent = message;
  }

  function showDetails(point) {
    const title = details.querySelector("#globe-details-title");
    const subtitle = details.querySelector(".globe-details-subtitle");
    const fields = details.querySelector(".globe-details-fields");
    title.textContent = point.name;
    subtitle.textContent = [point.region, point.country].filter(Boolean).join(" · ") ||
      (point.kind === "owner" ? "Корпоративний офіс" : "Координатна мітка");
    fields.replaceChildren();
    const values = [
      ["Власник", point.owner], ["Поточний стан", point.status], ["Процес", point.process],
      ["Тип родовища", point.depositType], ["Тип руди", point.oreType], ["Інші метали", point.otherMetals],
      ["Координати", Number(point.lat).toFixed(6) + ", " + Number(point.lng).toFixed(6)]
    ];
    values.forEach(([label, value]) => {
      if (!value) return;
      const dt = document.createElement("dt"), dd = document.createElement("dd");
      dt.textContent = label; dd.textContent = value; fields.append(dt, dd);
    });
    details.hidden = false;
  }

  function switchMode(mode) {
    if (!modes.includes(mode)) return;
    activeMode = mode;
    Object.entries(buttons).forEach(([key, button]) => button.setAttribute("aria-pressed", String(key === mode)));
    const isLeaflet = mode === "leaflet";
    map.style.display = isLeaflet ? "" : "none";
    globeStage.hidden = isLeaflet;
    globeCanvas.hidden = mode !== "globe";
    cesiumCanvas.hidden = mode !== "cesium";
    tools.hidden = isLeaflet;
    details.hidden = true;
    if (isLeaflet) {
      if (window.dispatchEvent) window.dispatchEvent(new Event("resize"));
      setTimeout(() => window.dispatchEvent(new Event("resize")), 40);
      return;
    }
    if (mode === "globe") initGlobe();
    if (mode === "cesium") initCesium();
    setTimeout(() => {
      if (mode === "globe" && globeInstance) globeInstance.width(globeCanvas.clientWidth).height(globeCanvas.clientHeight);
      if (mode === "cesium" && cesiumViewer) cesiumViewer.resize();
    }, 80);
  }

  function globeArcs() {
    return allPoints().filter(p => p.kind === "mine" && /BHP/i.test(p.owner || "")).map(p => ({
      startLat: p.lat, startLng: p.lng, endLat: bhp.lat, endLng: bhp.lng, color: ["#70dcff", "#278fc4"], sourceId: p.id
    }));
  }

  function initGlobe() {
    if (globeInstance || typeof window.Globe !== "function") return;
    globeInstance = window.Globe()(globeCanvas)
      .rendererConfig({ antialias: true, alpha: true, powerPreference: "high-performance" })
      .backgroundColor("#030a14")
      // Детальніша денна текстура Blue Marble замість темної нічної текстури з нижчою деталізацією.
      .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor("#4aa9df")
      .atmosphereAltitude(0.18)
      .pointsData(allPoints())
      .pointLat("lat").pointLng("lng")
      .pointAltitude(p => p.kind === "mine" ? 0.018 : 0.01)
      .pointRadius(p => p.kind === "owner" ? 0.42 : 0.3)
      .pointColor(p => p.kind === "mine" ? "#54d6ff" : p.kind === "owner" ? "#b5f5cf" : "#ffd166")
      .pointLabel(p => p.name + (p.country ? " · " + p.country : ""))
      .onPointClick(p => {
        if (addMarkerMode) { saveMarker(p.lat, p.lng); return; }
        showDetails(p);
      })
      .onGlobeClick(({ lat, lng }) => { if (addMarkerMode) saveMarker(lat, lng); })
      .arcsData(globeArcs())
      .arcStartLat("startLat").arcStartLng("startLng")
      .arcEndLat("endLat").arcEndLng("endLng")
      .arcColor("color").arcDashLength(0.45).arcDashGap(0.25)
      .arcDashAnimateTime(1800).arcStroke(0.65).arcAltitude(0.22);
    globeInstance.pointOfView({ lat: 15, lng: 0, altitude: 2.25 }, 0);
  }

  function initCesium() {
    if (cesiumViewer || !window.Cesium) {
      if (!window.Cesium) showStatus("CesiumJS не завантажився. Перевірте підключення до інтернету й оновіть сторінку.");
      return;
    }
    try {
      const C = window.Cesium;
      cesiumViewer = new C.Viewer(cesiumCanvas, {
        imageryProvider: new C.UrlTemplateImageryProvider({
          // Глобальна супутникова мозаїка: на відміну від OSM-тайлів, чітко показує континенти й рельєф.
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          credit: "Tiles © Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        }),
        terrainProvider: new C.EllipsoidTerrainProvider(),
        baseLayerPicker: false, geocoder: false, homeButton: false, sceneModePicker: false,
        navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
        infoBox: false, selectionIndicator: false, shouldAnimate: true
      });
      cesiumViewer.scene.globe.enableLighting = true;
      cesiumViewer.camera.setView({ destination: C.Cartesian3.fromDegrees(0, 15, 25000000) });
      refreshCesiumEntities();
      cesiumHandler = new C.ScreenSpaceEventHandler(cesiumViewer.scene.canvas);
      cesiumHandler.setInputAction(click => {
        const picked = cesiumViewer.scene.pick(click.position);
        if (picked && picked.id && picked.id.properties && picked.id.properties.pointIndex) {
          const idx = picked.id.properties.pointIndex.getValue();
          const point = allPoints()[idx];
          if (point) { showDetails(point); return; }
        }
        if (!addMarkerMode) return;
        const cartesian = cesiumViewer.camera.pickEllipsoid(click.position, cesiumViewer.scene.globe.ellipsoid);
        if (!cartesian) return;
        const cartographic = C.Cartographic.fromCartesian(cartesian);
        saveMarker(C.Math.toDegrees(cartographic.latitude), C.Math.toDegrees(cartographic.longitude));
      }, C.ScreenSpaceEventType.LEFT_CLICK);
    } catch (error) {
      console.error("CesiumJS initialization failed", error);
      showStatus("Не вдалося запустити CesiumJS. Спробуйте перезавантажити сторінку.");
    }
  }

  function refreshCesiumEntities() {
    if (!cesiumViewer) return;
    const C = window.Cesium;
    cesiumViewer.entities.removeAll();
    const points = allPoints();
    points.forEach((p, index) => {
      cesiumViewer.entities.add({
        position: C.Cartesian3.fromDegrees(p.lng, p.lat),
        point: { pixelSize: p.kind === "owner" ? 11 : 8,
          color: C.Color.fromCssColorString(p.kind === "mine" ? "#54d6ff" : p.kind === "owner" ? "#b5f5cf" : "#ffd166"),
          outlineColor: C.Color.WHITE, outlineWidth: 1, disableDepthTestDistance: Number.POSITIVE_INFINITY },
        label: p.kind === "owner" ? { text: "BHP", font: "bold 12px sans-serif",
          fillColor: C.Color.fromCssColorString("#b5f5cf"), pixelOffset: new C.Cartesian2(0, -18),
          disableDepthTestDistance: Number.POSITIVE_INFINITY } : undefined,
        properties: { pointIndex: index }
      });
    });
    globeArcs().forEach(a => {
      const positions = [];
      const steps = 80;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        positions.push(C.Cartesian3.fromDegrees(a.startLng + (a.endLng - a.startLng) * t,
          a.startLat + (a.endLat - a.startLat) * t, 90000 * Math.sin(Math.PI * t)));
      }
      cesiumViewer.entities.add({ polyline: { positions, width: 3,
        material: new C.PolylineDashMaterialProperty({ color: C.Color.fromCssColorString("#70dcff"), dashLength: 16 }) } });
    });
  }

  function refreshGlobeData() {
    if (globeInstance) globeInstance.pointsData(allPoints()).arcsData(globeArcs());
    if (cesiumViewer) refreshCesiumEntities();
  }

  function flyToPoint(point) {
    if (activeMode === "globe" && globeInstance) {
      globeInstance.pointOfView({ lat: point.lat, lng: point.lng, altitude: 0.7 }, 1000);
    } else if (activeMode === "cesium" && cesiumViewer) {
      cesiumViewer.camera.flyTo({ destination: window.Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 1800000), duration: 1.4 });
    }
    showDetails(point);
  }

  document.getElementById("globe-search-form").addEventListener("submit", event => {
    event.preventDefault();
    const query = document.getElementById("globe-search").value.trim().toLocaleLowerCase("uk");
    const results = document.getElementById("globe-results");
    results.replaceChildren();
    if (!query) { showStatus("Введіть назву шахти, країну, регіон або координати."); return; }
    const coordMatch = query.match(/^\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (coordMatch) {
      const lat = Number(coordMatch[1]), lng = Number(coordMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        const point = { id: "search-coordinates", name: "Пошук за координатами", lat, lng, kind: "custom" };
        if (activeMode === "globe" && globeInstance) globeInstance.pointOfView({ lat, lng, altitude: 0.65 }, 1000);
        if (activeMode === "cesium" && cesiumViewer) cesiumViewer.camera.flyTo({ destination: window.Cesium.Cartesian3.fromDegrees(lng, lat, 1800000), duration: 1.4 });
        showDetails(point); showStatus("Перехід до координат " + lat.toFixed(6) + ", " + lng.toFixed(6)); return;
      }
    }
    const found = allPoints().filter(p => [p.name, p.country, p.region, p.owner].join(" ").toLocaleLowerCase("uk").includes(query));
    found.slice(0, 8).forEach(point => {
      const button = document.createElement("button");
      button.type = "button"; button.className = "globe-result";
      button.textContent = point.name + ([point.region, point.country].filter(Boolean).length ? " · " + [point.region, point.country].filter(Boolean).join(", ") : "");
      button.addEventListener("click", () => flyToPoint(point));
      results.appendChild(button);
    });
    showStatus(found.length ? "Знайдено об’єктів: " + found.length + ". Оберіть результат." : "Нічого не знайдено серед завантажених об’єктів.");
  });

  document.getElementById("globe-add-marker").addEventListener("click", event => {
    addMarkerMode = !addMarkerMode;
    const button = event.currentTarget;
    button.setAttribute("aria-pressed", String(addMarkerMode));
    button.classList.toggle("is-active", addMarkerMode);
    button.textContent = addMarkerMode ? "× Скасувати додавання" : "＋ Додати мітку";
    showStatus(addMarkerMode ? "Натисніть на поверхню глобуса, щоб поставити мітку." : "Режим додавання міток вимкнено.");
  });

  document.getElementById("globe-home").addEventListener("click", () => {
    if (activeMode === "globe" && globeInstance) globeInstance.pointOfView({ lat: 15, lng: 0, altitude: 2.25 }, 800);
    if (activeMode === "cesium" && cesiumViewer) cesiumViewer.camera.flyTo({ destination: window.Cesium.Cartesian3.fromDegrees(0, 15, 25000000), duration: 1.2 });
    details.hidden = true;
  });

  const globeScript = document.createElement("script");
  globeScript.src = "https://unpkg.com/globe.gl";
  globeScript.async = true;
  globeScript.onload = () => { if (activeMode === "globe") initGlobe(); };
  globeScript.onerror = () => showStatus("Globe.gl не завантажився. Перевірте підключення до інтернету.");
  document.head.appendChild(globeScript);

  const cesiumCss = document.createElement("link");
  cesiumCss.rel = "stylesheet";
  cesiumCss.href = "https://cesium.com/downloads/cesiumjs/releases/1.125/Build/Cesium/Widgets/widgets.css";
  document.head.appendChild(cesiumCss);
  window.CESIUM_BASE_URL = "https://cesium.com/downloads/cesiumjs/releases/1.125/Build/Cesium/";
  const cesiumScript = document.createElement("script");
  cesiumScript.src = "https://cesium.com/downloads/cesiumjs/releases/1.125/Build/Cesium/Cesium.js";
  cesiumScript.async = true;
  cesiumScript.onload = () => { if (activeMode === "cesium") initCesium(); };
  cesiumScript.onerror = () => showStatus("CesiumJS не завантажився. Перевірте підключення до інтернету.");
  document.head.appendChild(cesiumScript);
})();