let selectedRobotCompanyId = 'boston-dynamics';

function getRobotCompanyId(loc) {
    const value = String(loc.robotCompany || loc.company || '').toLowerCase();

    if (value.includes('boston dynamics')) return 'boston-dynamics';
    if (value.includes('tesla')) return 'tesla';
    if (value.includes('figure ai') || value.includes('figure')) return 'figure-ai';
    if (value.includes('agility robotics')) return 'agility-robotics';
    if (value.includes('apptronik')) return 'apptronik';
    if (value.includes('sanctuary ai')) return 'sanctuary-ai';
    if (value.includes('1x technologies') || value.includes('1x')) return '1x-technologies';
    if (value.includes('unitree')) return 'unitree-robotics';
    if (value.includes('ubtech')) return 'ubtech-robotics';
    if (value.includes('agibot') || value.includes('zhiyuan')) return 'agiBot-zhiyuan';
    if (value.includes('fourier intelligence')) return 'fourier-intelligence';
    if (value.includes('kepler exploration')) return 'kepler-exploration';
    if (value.includes('robotera')) return 'robotera';
    if (value.includes('xiaomi robotics') || value.includes('xiaomi')) return 'xiaomi-robotics';
    if (value.includes('xpeng robotics') || value.includes('iron')) return 'xpeng-robotics-iron';
    if (value.includes('hanson robotics')) return 'hanson-robotics';
    if (value.includes('rainbow robotics')) return 'rainbow-robotics';
    if (value.includes('neura robotics')) return 'neura-robotics';
    if (value.includes('pal robotics')) return 'pal-robotics';
    if (value.includes('engineered arts')) return 'engineered-arts';

    return null;
}

function renderRobotCompany(companyId) {
    clearLayers();

    const data = Object.values(window.countryData.robots || {})
        .flatMap(country => country.robotLocations || [])
        .filter(loc => getRobotCompanyId(loc) === companyId);

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

        const popupContent = createCardHtml(loc, 'robots');
        marker.bindPopup(popupContent, {
            maxWidth: 310,
            minWidth: 290,
            offset: [0, -6]
        });
        currentMarkers.push(marker);
    });

    if (data.length) {
        map.fitBounds(L.latLngBounds(data.map(loc => loc.coords)), {
            padding: [50, 50]
        });
    }
}

function renderScene(type) {
    if (type !== 'robots') return;
    selectedRobotCompanyId = 'boston-dynamics';
    renderRobotCompany(selectedRobotCompanyId);
}
