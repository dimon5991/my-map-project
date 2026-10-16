(() => {
  "use strict";
  const page = document.querySelector(".map-page");
  const mapElement = document.getElementById("map");
  if (!page || !mapElement) return;

  const style = document.createElement("style");
  style.textContent = "#leaflet-globe-stage[hidden]{display:none!important}";
  document.head.appendChild(style);

  const stage = document.createElement("section");
  stage.id = "leaflet-globe-stage";
  stage.hidden = true;
  stage.setAttribute("aria-label", "Тривимірний картографічний глобус");
  stage.innerHTML = '<div id="leaflet-globe-canvas"></div>' +
    '<div class="leaflet-globe-toolbar"><button type="button" id="leaflet-globe-home">Початковий вигляд</button><span id="leaflet-globe-status" role="status">Завантаження картографічного шару…</span></div>' +
    '<section id="leaflet-globe-card" class="leaflet-globe-card" hidden><button type="button" id="leaflet-globe-card-close" aria-label="Закрити картку">×</button><h2 id="leaflet-globe-card-title"></h2><p id="leaflet-globe-card-subtitle"></p><dl id="leaflet-globe-card-fields"></dl></section>';
  page.appendChild(stage);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.id = "leaflet-globe-toggle";
  toggle.className = "leaflet-globe-toggle";
  toggle.textContent = "3D-глобус";
  toggle.setAttribute("aria-pressed", "false");
  page.appendChild(toggle);

  const status = stage.querySelector("#leaflet-globe-status");
  const card = stage.querySelector("#leaflet-globe-card");
  let active = false, started = false, failed = false;
  let renderer, scene, camera, earth, group, animationFrame, raycaster, pointer;
  let pointObjects = [];
  let overlayObjects = [];
  let dragging = false, moved = false, previousX = 0, previousY = 0;
  let globeTexture;

  function setStatus(message) { status.textContent = message; }
  function switchMode(on) {
    active = on;
    stage.hidden = !on;
    mapElement.style.display = on ? "none" : "";
    toggle.textContent = on ? "Повернутися до 2D" : "3D-глобус";
    toggle.setAttribute("aria-pressed", String(on));
    if (on) {
      startGlobe();
      resize();
    } else {
      card.hidden = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (window.dispatchEvent) window.dispatchEvent(new Event("resize"));
      setTimeout(() => { window.dispatchEvent(new Event("resize")); }, 60);
    }
  }
  toggle.addEventListener("click", () => switchMode(!active));
  stage.querySelector("#leaflet-globe-home").addEventListener("click", () => {
    if (!group) return;
    group.rotation.set(0.12, 0, 0);
    camera.position.set(0, 0, 12.6);
    card.hidden = true;
  });
  stage.querySelector("#leaflet-globe-card-close").addEventListener("click", () => { card.hidden = true; });

  function drawCartographicTexture(geojson) {
    const canvas = document.createElement("canvas");
    canvas.width = 2048; canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const ocean = ctx.createLinearGradient(0, 0, 0, h);
    ocean.addColorStop(0, "#142e43");
    ocean.addColorStop(0.48, "#183e55");
    ocean.addColorStop(1, "#102a40");
    ctx.fillStyle = ocean; ctx.fillRect(0, 0, w, h);

    // Latitude/longitude grid on an equirectangular map texture.
    ctx.strokeStyle = "rgba(155,205,226,0.19)";
    ctx.lineWidth = 1;
    for (let lon = -180; lon <= 180; lon += 30) {
      const x = (lon + 180) / 360 * w;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let lat = -60; lat <= 80; lat += 20) {
      const y = (90 - lat) / 180 * h;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    function ring(coords) {
      if (!coords || !coords.length) return;
      ctx.beginPath();
      let started = false, prevX = null;
      coords.forEach((coord) => {
        const lon = Number(coord[0]), lat = Number(coord[1]);
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) return;
        const x = (lon + 180) / 360 * w;
        const y = (90 - lat) / 180 * h;
        if (!started || (prevX !== null && Math.abs(x - prevX) > w * 0.5)) {
          if (started) { ctx.stroke(); ctx.beginPath(); }
          ctx.moveTo(x, y); started = true;
        } else ctx.lineTo(x, y);
        prevX = x;
      });
      ctx.closePath();
      ctx.fillStyle = "#78968c";
      ctx.fill();
      ctx.strokeStyle = "rgba(224,239,219,0.82)";
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
    if (geojson && Array.isArray(geojson.features)) {
      geojson.features.forEach(feature => {
        const g = feature && feature.geometry;
        if (!g) return;
        if (g.type === "Polygon") g.coordinates.forEach(ring);
        else if (g.type === "MultiPolygon") g.coordinates.forEach(poly => poly.forEach(ring));
      });
    } else {
      // Fallback silhouettes keep the globe usable if the boundary dataset is unavailable.
      const silhouettes = [
        [[-168,70],[-140,72],[-118,55],[-130,32],[-110,8],[-80,8],[-58,48],[-82,70],[-110,80],[-168,70]],
        [[-82,12],[-50,8],[-34,-8],[-48,-56],[-70,-54],[-80,-10],[-82,12]],
        [[-18,36],[8,70],[45,58],[52,12],[35,-35],[17,-35],[-5,5],[-18,36]],
        [[-10,72],[35,72],[180,60],[150,5],[115,-10],[80,8],[50,35],[20,35],[-10,55],[-10,72]],
        [[112,-11],[154,-10],[154,-40],[116,-35],[112,-11]],
        [[-50,80],[-20,78],[-25,60],[-45,58],[-50,80]]
      ];
      silhouettes.forEach(poly => ring(poly));
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace || THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
    return texture;
  }

  function getPoints() {
    const mines = (Array.isArray(window.COPPER_MINES) ? window.COPPER_MINES : []).filter(m =>
      m && m.coordinates && Number.isFinite(Number(m.coordinates.latitude)) &&
      Number.isFinite(Number(m.coordinates.longitude))).map(m => ({
        id: m.id, name: m.name || "Мідний об’єкт", country: m.country || "", region: m.region || "",
        owner: m.owner || "", status: m.status || "", process: m.process || "",
        depositType: m.depositType || "", oreType: m.oreType || "",
        otherMetals: Array.isArray(m.otherMetals) ? m.otherMetals.join(", ") : (m.otherMetals || ""),
        lat: Number(m.coordinates.latitude), lng: Number(m.coordinates.longitude), kind: "mine"
      }));
    let custom = [];
    try {
      const saved = JSON.parse(localStorage.getItem("my-map-project-saved-markers") || "[]");
      if (Array.isArray(saved)) custom = saved.filter(p => p && Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lng)))
        .map((p, i) => ({ id: "custom-" + i, name: p.name || "Власна мітка", lat: Number(p.lat), lng: Number(p.lng), kind: "custom" }));
    } catch (_) {}
    return [...mines, ...custom, { id: "bhp-office", name: "BHP Group", country: "Австралія",
      region: "Melbourne", owner: "Корпоративний офіс", status: "Офіс компанії",
      lat: -37.815158, lng: 144.968108, kind: "owner" }];
  }

  function vectorFor(lat, lng, radius) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + 180) * Math.PI / 180;
    return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
  }

  function showPoint(point) {
    stage.querySelector("#leaflet-globe-card-title").textContent = point.name;
    stage.querySelector("#leaflet-globe-card-subtitle").textContent = [point.region, point.country].filter(Boolean).join(" · ");
    const fields = stage.querySelector("#leaflet-globe-card-fields");
    fields.replaceChildren();
    [["Власник", point.owner], ["Поточний стан", point.status], ["Процес", point.process],
      ["Тип родовища", point.depositType], ["Тип руди", point.oreType], ["Інші метали", point.otherMetals],
      ["Координати", Number(point.lat).toFixed(6) + ", " + Number(point.lng).toFixed(6)]].forEach(([name, value]) => {
      if (!value) return;
      const dt = document.createElement("dt"), dd = document.createElement("dd");
      dt.textContent = name; dd.textContent = value; fields.append(dt, dd);
    });
    card.hidden = false;
  }

  function addPointsAndRoutes() {
    if (!group) return;
    overlayObjects.forEach(object => group.remove(object));
    overlayObjects = [];
    pointObjects = [];
    const points = getPoints();
    const bhp = points.find(p => p.kind === "owner");
    points.forEach(point => {
      const color = point.kind === "mine" ? 0x4bd5ff : point.kind === "owner" ? 0x9af0c6 : 0xffc857;
      // Larger emissive-looking markers sit clearly above the sphere's polygon surface.
      const radius = point.kind === "owner" ? 0.105 : point.kind === "mine" ? 0.09 : 0.075;
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 18, 14),
        new THREE.MeshBasicMaterial({ color, depthTest: true })
      );
      marker.position.copy(vectorFor(point.lat, point.lng, 5.075));
      marker.userData.point = point;
      group.add(marker);
      pointObjects.push(marker);
      overlayObjects.push(marker);
    });
    if (bhp) {
      points.filter(p => p.kind === "mine" && /BHP/i.test(p.owner || "")).forEach(point => {
        const start = vectorFor(point.lat, point.lng, 5.035);
        const end = vectorFor(bhp.lat, bhp.lng, 5.035);
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(5.8);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(72)),
          new THREE.LineDashedMaterial({ color: 0x68d9ff, dashSize: 0.12, gapSize: 0.09, linewidth: 1 }));
        line.computeLineDistances();
        group.add(line);
        overlayObjects.push(line);
      });
    }
  }

  function resize() {
    if (!renderer || !camera || !active) return;
    const width = Math.max(1, stage.clientWidth), height = Math.max(1, stage.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function renderLoop() {
    if (!active || !renderer) return;
    animationFrame = requestAnimationFrame(renderLoop);
    // Обертаємо всю групу: текстура, материки, маркери й лінії залишаються синхронними.
    if (group) group.rotation.y += 0.00015;
    renderer.render(scene, camera);
  }

  function startGlobe() {
    if (started || failed) {
      if (started) renderLoop();
      return;
    }
    if (!window.THREE) {
      setStatus("Завантажується рушій 3D…"); return;
    }
    started = true;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(stage.clientWidth || window.innerWidth, stage.clientHeight || window.innerHeight);
      renderer.setClearColor(0x071522, 1);
      document.getElementById("leaflet-globe-canvas").appendChild(renderer.domElement);
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x071522);
      camera = new THREE.PerspectiveCamera(38, (stage.clientWidth || window.innerWidth) / (stage.clientHeight || window.innerHeight), 0.1, 100);
      camera.position.set(0, 0, 12.6);
      scene.add(new THREE.AmbientLight(0xffffff, 1.45));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(6, 4, 8); scene.add(key);
      group = new THREE.Group(); scene.add(group);
      raycaster = new THREE.Raycaster(); pointer = new THREE.Vector2();
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 128, 96),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, metalness: 0.0 }));
      earth = sphere; group.add(earth);
      fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
        .then(response => { if (!response.ok) throw new Error("GeoJSON HTTP " + response.status); return response.json(); })
        .then(geojson => {
          if (!active && !started) return;
          globeTexture = drawCartographicTexture(geojson);
          earth.material.map = globeTexture;
          earth.material.needsUpdate = true;
          addPointsAndRoutes();
          setStatus("Картографічний глобус готовий. Перетягуйте Землю мишкою, колесом змінюйте масштаб.");
        })
        .catch(error => {
          console.warn("Не вдалося завантажити межі країн:", error);
          globeTexture = drawCartographicTexture(null);
          earth.material.map = globeTexture; earth.material.needsUpdate = true;
          addPointsAndRoutes();
          setStatus("Глобус запущено зі спрощеною картою. Межі країн тимчасово недоступні.");
        });

      renderer.domElement.addEventListener("pointerdown", event => {
        dragging = true; moved = false; previousX = event.clientX; previousY = event.clientY;
        renderer.domElement.setPointerCapture(event.pointerId);
      });
      renderer.domElement.addEventListener("pointermove", event => {
        if (!dragging) return;
        const dx = event.clientX - previousX, dy = event.clientY - previousY;
        if (Math.abs(dx) + Math.abs(dy) > 1) moved = true;
        group.rotation.y += dx * 0.005;
        group.rotation.x = Math.max(-1.45, Math.min(1.45, group.rotation.x + dy * 0.005));
        previousX = event.clientX; previousY = event.clientY;
      });
      const stopDrag = () => { dragging = false; };
      renderer.domElement.addEventListener("pointerup", stopDrag);
      renderer.domElement.addEventListener("pointercancel", stopDrag);
      renderer.domElement.addEventListener("wheel", event => {
        event.preventDefault();
        camera.position.z = Math.max(6.1, Math.min(22, camera.position.z + event.deltaY * 0.008));
      }, { passive: false });
      renderer.domElement.addEventListener("click", event => {
        if (moved) { moved = false; return; }
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        // Сфера перекриває маркери на зворотному боці Землі.
        const hit = raycaster.intersectObjects([earth, ...pointObjects], false)[0];
        if (hit && hit.object !== earth && hit.object.userData.point) showPoint(hit.object.userData.point);
      });
      window.addEventListener("resize", resize);
      resize(); renderLoop();
    } catch (error) {
      console.error("3D globe failed:", error);
      failed = true; setStatus("Не вдалося запустити 3D-глобус. Поверніться до 2D та оновіть сторінку.");
    }
  }

  const threeScript = document.createElement("script");
  threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  threeScript.async = true;
  threeScript.onload = () => { if (active) startGlobe(); };
  threeScript.onerror = () => { failed = true; setStatus("Не вдалося завантажити Three.js. Перевірте підключення до інтернету."); };
  document.head.appendChild(threeScript);
  window.addEventListener("resize", resize);
})();