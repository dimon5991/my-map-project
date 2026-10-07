function renderWireLogisticsView() {
            clearLayers();
            const bounds = [];

            const factoryIcon = L.divIcon({ className: 'custom-factory-marker', iconSize: [16, 16], iconAnchor: [8, 8] });
            (window.countryData.minerals?.china?.wireLocations || []).forEach(loc => {
                const marker = L.marker(loc.coords, { icon: factoryIcon }).addTo(map);
                marker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">🏭 ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-wire">Завод дротів та кабелів</span>
                    </div>
                `, { maxWidth: 300 });
                currentMarkers.push(marker);
                bounds.push(loc.coords);
            });

            const destIcon = L.divIcon({ className: 'custom-destination-marker', iconSize: [16, 16], iconAnchor: [8, 8] });
            (Object.values(window.countryData.minerals || {}).flatMap(c => c.wireDestinationsLocations || [])).forEach(loc => {
                const marker = L.marker(loc.coords, { icon: destIcon }).addTo(map);
                marker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">🚢 ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-dest">Пункт призначення / Хаб</span>
                    </div>
                `, { maxWidth: 300 });
                currentMarkers.push(marker);
                bounds.push(loc.coords);
            });

            drawPairConnections((window.countryData.minerals?.china?.wireLocations || []), (Object.values(window.countryData.minerals || {}).flatMap(c => c.wireDestinationsLocations || [])));

            if (bounds.length > 0) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }

function renderFullSupplyChain() {
            clearLayers();
            const bounds = [];

            const plantIcon = L.divIcon({ className: 'custom-plant-marker', iconSize: [16, 16], iconAnchor: [8, 8] });
            (Object.values(window.countryData.minerals || {}).flatMap(c => c.plantLocations || [])).forEach(loc => {
                const marker = L.marker(loc.coords, { icon: plantIcon }).addTo(map);
                marker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">🏭 ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-refinery">1. Рафінування Міді</span>
                    </div>
                `, { maxWidth: 300 });
                currentMarkers.push(marker);
                bounds.push(loc.coords);
            });

            const compIcon = L.divIcon({ className: 'custom-component-marker', iconSize: [16, 16], iconAnchor: [8, 8] });
            (Object.values(window.countryData.automotive_industry || {}).flatMap(c => c.componentSuppliers || [])).forEach(loc => {
                const marker = L.marker(loc.coords, { icon: compIcon }).addTo(map);
                marker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">⚙️ ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-component">2. Деталі та Вузли</span>
                    </div>
                `, { maxWidth: 300 });
                currentMarkers.push(marker);
                bounds.push(loc.coords);
            });

            const finalIcon = L.divIcon({ className: 'custom-final-marker', iconSize: [16, 16], iconAnchor: [8, 8] });
            (Object.values(window.countryData.automotive_industry || {}).flatMap(c => c.finalFactories || [])).forEach(loc => {
                const marker = L.marker(loc.coords, { icon: finalIcon }).addTo(map);
                marker.bindPopup(`
                    <div style="padding: 12px;">
                        <div class="popup-title">🚘 ${loc.title}</div>
                        <div class="popup-desc">${loc.text}</div>
                        <span class="popup-tag tag-final">3. Готова Продукція</span>
                    </div>
                `, { maxWidth: 300 });
                currentMarkers.push(marker);
                bounds.push(loc.coords);
            });

            (window.countryData.minerals?.japan?.fullSupplyChains || []).forEach(route => {
                const isStage1 = route.stage === 1;
                const polyline = L.polyline([route.from, route.to], {
                    color: isStage1 ? '#00d2ff' : '#e040fb',
                    weight: isStage1 ? 2 : 3,
                    opacity: 0.8,
                    className: isStage1 ? 'animated-route-stage1' : 'animated-route-stage2'
                }).addTo(map);

                polyline.bindTooltip(route.label, { sticky: true });
                currentLines.push(polyline);
            });

            if (bounds.length > 0) {
                map.fitBounds(bounds, { padding: [40, 40] });
            }
        }
