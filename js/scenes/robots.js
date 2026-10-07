function renderScene(type) {
            clearLayers();

            const isRobot = (type === 'robots');
            const data = (Object.values(window.countryData.robots || {}).flatMap(c => c.robotLocations || []));

            data.forEach(loc => {
                if (!loc.isHub) {
                    const curveCoords = createCurvePoints(loc.coords, WALTHAM_COORDS);
                    const polyline = L.polyline(curveCoords, {
                        className: 'supply-line-robot',
                        interactive: false
                    }).addTo(map);
                    currentLines.push(polyline);
                }
            });

            data.forEach(loc => {
                const dotClass = loc.isHub ? 'dot-hub-robot' : 'dot-robot';
                const size = loc.isHub ? 26 : 18;

                const iconHtml = `
                    <div class="custom-marker-wrapper">
                        <div class="marker-dot ${dotClass}"></div>
                    </div>
                `;

                const customIcon = L.divIcon({
                    html: iconHtml,
                    className: '',
                    iconSize: [size, size],
                    iconAnchor: [size / 2, size / 2]
                });

                const marker = L.marker(loc.coords, { 
                    icon: customIcon,
                    zIndexOffset: loc.isHub ? 1500 : 500
                }).addTo(map);

                const popupContent = createCardHtml(loc, type);
                marker.bindPopup(popupContent, { maxWidth: 310, minWidth: 290, offset: [0, -6] });
                currentMarkers.push(marker);
            });
        }
