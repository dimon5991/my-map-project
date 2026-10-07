document.addEventListener("DOMContentLoaded", function() {
    map = L.map('map', { center: [25, 10], zoom: 3, worldCopyJump: true });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }).addTo(map);
    buildSubDropdownMenu();
    renderScene('robots');
    setTimeout(() => { map.invalidateSize(); }, 200);
});