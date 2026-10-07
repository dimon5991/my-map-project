const WALTHAM_COORDS = [42.3765, -71.2356];

let map;
let currentMarkers = [];
let currentLines = [];
let selectedCompanyId = 'all';

function clearLayers() {
            currentMarkers.forEach(m => map.removeLayer(m));
            currentLines.forEach(l => map.removeLayer(l));
            currentMarkers = [];
            currentLines = [];
        }
