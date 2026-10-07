function renderJapanPowerPlantsView() {
            clearLayers();

            const targetCompanies = selectedCompanyId === 'all' 
                ? (window.countryData.energy?.japan?.japanCompanies || []) 
                : (window.countryData.energy?.japan?.japanCompanies || []).filter(c => c.id === selectedCompanyId);

            if (selectedCompanyId !== 'all' && targetCompanies.length > 0 && targetCompanies[0].plants.length > 0) {
                map.flyTo(targetCompanies[0].plants[0].coords, 7);
            } else {
                map.flyTo([36.5, 138.0], 5);
            }

            targetCompanies.forEach(comp => {
                for (let i = 0; i < comp.plants.length - 1; i++) {
                    const plantA = comp.plants[i];
                    const plantB = comp.plants[i + 1];

                    const curveCoords = createCurvePoints(plantA.coords, plantB.coords);
                    const polyline = L.polyline(curveCoords, {
                        className: 'supply-line-custom',
                        color: comp.color,
                        interactive: false
                    }).addTo(map);
                    currentLines.push(polyline);
                }

                comp.plants.forEach((plant) => {
                    const size = 16;
                    const iconHtml = `
                        <div class="custom-marker-wrapper">
                            <div class="marker-dot" style="
                                width: ${size}px;
                                height: ${size}px;
                                background-color: ${comp.color};
                                box-shadow: 0 0 10px ${comp.color}, 0 0 20px ${comp.color};
                            "></div>
                        </div>
                    `;

                    const customIcon = L.divIcon({
                        html: iconHtml,
                        className: '',
                        iconSize: [size, size],
                        iconAnchor: [size / 2, size / 2]
                    });

                    const marker = L.marker(plant.coords, { icon: customIcon }).addTo(map);

                    const locData = {
                        title: plant.name,
                        company: comp.name,
                        badge: plant.type,
                        role: plant.role,
                        text: `<b>Електростанція компанії ${comp.name}</b><br>Генераційна потужність: ${plant.cap}`,
                        specs: [
                            { k: "Оператор", v: comp.name },
                            { k: "Тип станції", v: plant.type },
                            { k: "Потужність", v: plant.cap },
                            { k: "Статус", v: "Діючий об'єкт" }
                        ]
                    };

                    const popupContent = createJapanCardHtml(locData, comp.color);
                    marker.bindPopup(popupContent, { maxWidth: 310, minWidth: 290, offset: [0, -6] });
                    currentMarkers.push(marker);
                });
            });
        }


function renderGenericEnergyCountry(country) {
    clearLayers();
    const companies = window.countryData.energy?.[country]?.japanCompanies || [];
    const data = companies.flatMap(company => (company.plants || []).map(plant => ({
        ...plant,
        company: company.name,
        color: company.color
    })));

    data.forEach(plant => {
        const icon = L.divIcon({
            html: '<div style="width:18px;height:18px;border-radius:50%;background:' + (plant.color || '#3388ff') + ';border:3px solid white;"></div>',
            className: '',
            iconSize:[24,24],
            iconAnchor:[12,12]
        });
        const marker = L.marker(plant.coords, {icon}).addTo(map);
        marker.bindPopup('<b>' + plant.name + '</b><br>' + (plant.company || '') + '<br>' + (plant.type || '') + '<br>' + (plant.role || '') + '<br>Потужність: ' + (plant.cap || '—'));
        currentMarkers.push(marker);
    });
    if (data.length) map.fitBounds(L.latLngBounds(data.map(x => x.coords)), {padding:[40,40]});
}
