const WALTHAM_COORDS = [42.3765, -71.2356];

let map;
let currentMarkers = [];
let currentLines = [];
let selectedCompanyId = 'all';

const L = {
    divIcon(options = {}) {
        return options;
    },

    marker(coords, options = {}) {
        let nativeMarker = null;
        let popup = null;
        const wrapper = {
            _remove() {
                if (nativeMarker) nativeMarker.setMap(null);
            },
            addTo(target) {
                nativeMarker = new google.maps.Marker({
                    position: { lat: Number(coords[0]), lng: Number(coords[1]) },
                    map: target._googleMap,
                    icon: createGoogleMarkerIcon(options.icon)
                });
                return wrapper;
            },
            bindPopup(html) {
                popup = new google.maps.InfoWindow({ content: html });
                if (nativeMarker) {
                    nativeMarker.addListener('click', () => popup.open({
                        map: map._googleMap,
                        anchor: nativeMarker
                    }));
                }
                return wrapper;
            },
            bindTooltip(html) {
                const tooltip = new google.maps.InfoWindow({ content: html });
                if (nativeMarker) {
                    nativeMarker.addListener('mouseover', () => tooltip.open({
                        map: map._googleMap,
                        anchor: nativeMarker
                    }));
                    nativeMarker.addListener('mouseout', () => tooltip.close());
                }
                return wrapper;
            }
        };
        return wrapper;
    },

    polyline(coords, options = {}) {
        let nativeLine = null;
        const wrapper = {
            _remove() {
                if (nativeLine) nativeLine.setMap(null);
            },
            addTo(target) {
                nativeLine = new google.maps.Polyline({
                    path: coords.map(([lat, lng]) => ({
                        lat: Number(lat),
                        lng: Number(lng)
                    })),
                    geodesic: true,
                    strokeColor: options.color || '#00ffff',
                    strokeOpacity: options.opacity ?? 0.7,
                    strokeWeight: options.weight || 2,
                    clickable: options.interactive !== false,
                    map: target._googleMap
                });
                return wrapper;
            },
            bindTooltip(html) {
                if (!nativeLine) return wrapper;
                const tooltip = new google.maps.InfoWindow({ content: html });
                nativeLine.addListener('click', event => {
                    tooltip.setPosition(event.latLng);
                    tooltip.open({ map: map._googleMap });
                });
                return wrapper;
            }
        };
        return wrapper;
    },

    latLngBounds(coords) {
        const bounds = new google.maps.LatLngBounds();
        coords.forEach(coord => bounds.extend({
            lat: Number(coord[0]),
            lng: Number(coord[1])
        }));
        return bounds;
    }
};

function createGoogleMarkerIcon(icon = {}) {
    const size = Number(icon?.iconSize?.[0] || 18);
    const color = extractMarkerColor(icon?.html || '', icon?.className || '');
    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
        '<circle cx="' + (size / 2) + '" cy="' + (size / 2) + '" r="' + Math.max(4, size / 2 - 2) + '" fill="' + color + '" stroke="#ffffff" stroke-width="2"/>' +
        '</svg>';

    return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(size, size),
        anchor: new google.maps.Point(size / 2, size / 2)
    };
}

function extractMarkerColor(html = '', className = '') {
    const inline = html.match(/background(?:-color)?\s*:\s*([^;"']+)/i);
    if (inline) return inline[1].trim();

    const classes = className + ' ' + html;
    const colors = {
        'dot-robot': '#ffcc00',
        'dot-hub-robot': '#00d2ff',
        'dot-construction': '#00d2ff',
        'dot-cement': '#a855f7',
        'custom-india-construction-marker': '#00ffaa',
        'custom-india-cement-marker': '#ff0055',
        'custom-canada-construction-marker': '#00ffcc',
        'custom-canada-cement-marker': '#ff3366',
        'custom-plant-marker': '#00d2ff',
        'custom-component-marker': '#00ff88',
        'custom-final-marker': '#e040fb',
        'custom-factory-marker': '#ff3333',
        'custom-destination-marker': '#00ffff'
    };

    for (const [key, color] of Object.entries(colors)) {
        if (classes.includes(key)) return color;
    }
    return '#00d2ff';
}

function createGoogleMapAdapter(elementId, options = {}) {
    const googleMap = new google.maps.Map(document.getElementById(elementId), {
        center: {
            lat: options.center?.[0] ?? 25,
            lng: options.center?.[1] ?? 10
        },
        zoom: options.zoom ?? 3,
        mapTypeId: 'satellite',
        mapTypeControl: true,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
        },
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'greedy'
    });

    return {
        _googleMap: googleMap,

        setView(center, zoom) {
            googleMap.setCenter({
                lat: Number(center[0]),
                lng: Number(center[1])
            });
            if (zoom != null) googleMap.setZoom(zoom);
        },

        flyTo(center, zoom) {
            googleMap.panTo({
                lat: Number(center[0]),
                lng: Number(center[1])
            });
            if (zoom != null) googleMap.setZoom(zoom);
        },

        fitBounds(bounds, options = {}) {
            googleMap.fitBounds(bounds, options.padding || 40);
        },

        removeLayer(layer) {
            if (layer?._remove) layer._remove();
        },

        invalidateSize() {
            google.maps.event.trigger(googleMap, 'resize');
        },

        setMapTypeId(type) {
            googleMap.setMapTypeId(type);
        }
    };
}

function clearLayers() {
    currentMarkers.forEach(marker => marker._remove?.());
    currentLines.forEach(line => line._remove?.());
    currentMarkers = [];
    currentLines = [];
}
