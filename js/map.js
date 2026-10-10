const WALTHAM_COORDS = [42.3765, -71.2356];

let map;
let currentMarkers = [];
let currentLines = [];
let selectedCompanyId = 'all';

const MAP_LAYERS = {
    standard: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri and its suppliers'
    }),
    terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
    })
};

function createLeafletMap(elementId, options = {}) {
    const leafletMap = L.map(elementId, {
        center: options.center || [25, 10],
        zoom: options.zoom ?? 3,
        layers: [MAP_LAYERS.standard],
        zoomControl: true,
        worldCopyJump: true
    });

    L.control.layers(
        {
            '🗺️ Звичайна карта': MAP_LAYERS.standard,
            '🛰️ Супутник': MAP_LAYERS.satellite,
            '⛰️ Рельєф': MAP_LAYERS.terrain
        },
        null,
        { collapsed: false, position: 'topright' }
    ).addTo(leafletMap);

    return leafletMap;
}

function clearLayers() {
    currentMarkers.forEach(layer => {
        if (map && map.hasLayer(layer)) map.removeLayer(layer);
    });
    currentLines.forEach(layer => {
        if (map && map.hasLayer(layer)) map.removeLayer(layer);
    });
    currentMarkers = [];
    currentLines = [];
}
