function renderConstructionView() {
            clearLayers();

            (window.countryData.construction?.usa?.constructionLocations || []).forEach(loc => {
                const iconHtml = `
                    <div class="custom-marker-wrapper">
                        <div class="marker-dot dot-construction"></div>
                    </div>
                `;
                const customIcon = L.divIcon({
                    html: iconHtml,
                    className: '',
                    iconSize: [18, 18],
                    iconAnchor: [9, 9]
                });

                const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
                const popupContent = createCardHtml(loc, 'construction');
                marker.bindPopup(popupContent, { maxWidth: 310, minWidth: 290, offset: [0, -6] });
                currentMarkers.push(marker);
            });

            (window.countryData.construction?.usa?.cementLocations || []).forEach(loc => {
                const iconHtml = `
                    <div class="custom-marker-wrapper">
                        <div class="marker-dot dot-cement"></div>
                    </div>
                `;
                const customIcon = L.divIcon({
                    html: iconHtml,
                    className: '',
                    iconSize: [18, 18],
                    iconAnchor: [9, 9]
                });

                const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
                marker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">🏭 ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-cement">Цементний завод США</span>
                    </div>
                `, { maxWidth: 300 });
                currentMarkers.push(marker);
            });

            (window.countryData.construction?.usa?.cementSupplyRoutes || []).forEach(route => {
                const polyline = L.polyline([route.from, route.to], {
                    color: '#a855f7',
                    weight: 2,
                    opacity: 0.85,
                    dashArray: '6, 8'
                }).addTo(map);

                polyline.bindTooltip(route.label, { sticky: true });
                currentLines.push(polyline);
            });

            map.setView([39.8283, -98.5795], 4);
        }

function renderCanadaConstructionWithSupplyChain() {
            clearLayers();

            const constrIcon = L.divIcon({
                className: 'custom-canada-construction-marker',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            const cementIcon = L.divIcon({
                className: 'custom-canada-cement-marker',
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });

            // 1. Нанесення будівельних хабів
            (window.countryData.construction?.canada?.constructionLocations || []).forEach(loc => {
                const marker = L.marker(loc.coords, { icon: constrIcon }).addTo(map);
                marker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">🏗️ ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-canada-construction">Будівельний хаб (Канада)</span>
                    </div>
                `, { maxWidth: 300 });
                currentMarkers.push(marker);
            });

            // 2. Нанесення цементних заводів та прокладання логістичних ліній
            (window.countryData.construction?.canada?.cementLocations || []).forEach(plant => {
                const plantMarker = L.marker(plant.coords, { icon: cementIcon }).addTo(map);
                plantMarker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">🏭 Цементний завод</div>
                        <div class="popup-desc"><b>${plant.name}</b><br>Основний постачальник цементу та бетону для регіональних будівельних підрядників.</div>
                        <span class="popup-tag tag-canada-cement">Цементний завод Канади</span>
                    </div>
                `, { maxWidth: 280 });
                currentMarkers.push(plantMarker);

                // Знаходження найближчого будівельного хабу для побудови логістичного зв'язку
                let closestHub = null;
                let minDistance = Infinity;

                (window.countryData.construction?.canada?.constructionLocations || []).forEach(hub => {
                    const dist = Math.hypot(
                        hub.coords[0] - plant.coords[0],
                        hub.coords[1] - plant.coords[1]
                    );
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestHub = hub;
                    }
                });

                if (closestHub) {
                    const polyline = L.polyline([plant.coords, closestHub.coords], {
                        color: '#ff3366',
                        weight: 1.5,
                        opacity: 0.7,
                        dashArray: '4, 8'
                    }).addTo(map);

                    polyline.bindTooltip(`Маршрут постачання: ${plant.name} ➔ ${closestHub.title.split(' ')[0]}`, {
                        sticky: true
                    });

                    currentLines.push(polyline);
                }
            });

            map.flyTo([52.0, -96.0], 4);
        }

function renderIndiaCementWithLogistics() {
            clearLayers();

            const constrIcon = L.divIcon({
                className: 'custom-india-construction-marker',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            (window.countryData.construction?.india?.constructionLocations || []).forEach(loc => {
                const marker = L.marker(loc.coords, { icon: constrIcon }).addTo(map);
                const popupContent = `
                    <div style="padding: 12px;">
                        <div class="popup-title">🏗️ ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-india-construction">Будівельна компанія Індії</span>
                    </div>
                `;
                marker.bindPopup(popupContent, { maxWidth: 300 });
                currentMarkers.push(marker);
            });

            const cementIcon = L.divIcon({
                className: 'custom-india-cement-marker',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            (window.countryData.construction?.india?.cementLocations || []).forEach(plant => {
                const marker = L.marker(plant.coords, { icon: cementIcon }).addTo(map);
                const popupContent = `
                    <div style="padding: 12px;">
                        <div class="popup-title">🧱 ${plant.title}</div>
                        <div class="popup-desc">${plant.text}</div>
                        <span class="popup-tag tag-india-cement">Цементний завод Індії</span>
                    </div>
                `;
                marker.bindPopup(popupContent, { maxWidth: 300 });
                currentMarkers.push(marker);

                const targetsList = plant.targets || (plant.targetCoords ? [plant.targetCoords] : []);
                
                targetsList.forEach(target => {
                    const polyline = L.polyline([plant.coords, target], {
                        color: '#ff0055',
                        weight: 2,
                        opacity: 0.8,
                        className: 'logistics-line-india'
                    }).addTo(map);

                    currentLines.push(polyline);
                });
            });

            map.flyTo([20.5937, 78.9629], 5);
        }


function renderGenericConstructionCountry(country) {
    clearLayers();
    const data = window.countryData.construction?.[country]?.constructionLocations || [];
    data.forEach(loc => {
        const icon = L.divIcon({
            html: '<div class="custom-marker-wrapper"><div class="marker-dot dot-robot"></div></div>',
            className: '',
            iconSize: [18,18],
            iconAnchor: [9,9]
        });
        const marker = L.marker(loc.coords, {icon}).addTo(map);
        marker.bindPopup('<div class="popup-card"><h3>' + (loc.title || 'Локація') + '</h3><div>' + (loc.text || '') + '</div></div>', {maxWidth:310,minWidth:290});
        currentMarkers.push(marker);
    });
    if (data.length) map.fitBounds(L.latLngBounds(data.map(x => x.coords)), {padding:[40,40]});
}
