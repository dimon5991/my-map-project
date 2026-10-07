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
