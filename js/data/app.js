let map;
let currentMarkers = [];
let currentLines = [];
let selectedCompanyId = 'all';

document.addEventListener("DOMContentLoaded", function() {
    map = L.map('map', {
        center: [25, 10],
        zoom: 3,
        worldCopyJump: true
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }).addTo(map);

    buildSubDropdownMenu();
    renderScene('robots');

    setTimeout(() => { map.invalidateSize(); }, 200);
});

function buildSubDropdownMenu() {
    const subContainer = document.getElementById('subDropdownContent');
    let html = `<button class="dropdown-item active" id="subitem-all" onclick="selectCompany('all')">🏢 Всі компанії</button>`;
    
    japanCompanies.forEach(comp => {
        html += `<button class="dropdown-item" id="subitem-${comp.id}" onclick="selectCompany('${comp.id}')">
            <span class="company-color-indicator" style="background-color: ${comp.color};"></span>
            ${comp.name}
        </button>`;
    });
    
    subContainer.innerHTML = html;
}

function toggleDropdown(panelId) {
    const panel = document.getElementById(panelId);
    const isOpen = panel.classList.contains('open');
    
    document.querySelectorAll('.dropdown-panel').forEach(p => p.classList.remove('open'));
    
    if (!isOpen) {
        panel.classList.add('open');
    }
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown-panel')) {
        document.querySelectorAll('.dropdown-panel').forEach(p => p.classList.remove('open'));
    }
});

function clearCurrentScene() {
    currentMarkers.forEach(m => map.removeLayer(m));
    currentLines.forEach(l => map.removeLayer(l));
    currentMarkers = [];
    currentLines = [];
}

function selectOption(type) {
    document.querySelectorAll('#dropdownPanelMain .dropdown-item').forEach(item => item.classList.remove('active'));
    const selectedItem = document.getElementById(`item-${type}`);
    if (selectedItem) selectedItem.classList.add('active');
    
    document.getElementById('selectedOptionMain').innerText = selectedItem.innerText;
    document.getElementById('dropdownPanelMain').classList.remove('open');
    
    const subPanel = document.getElementById('dropdownPanelSub');
    if (type === 'japan') {
        subPanel.style.display = 'block';
    } else {
        subPanel.style.display = 'none';
    }
    
    renderScene(type);
}

function selectCompany(companyId) {
    selectedCompanyId = companyId;
    document.querySelectorAll('#subDropdownContent .dropdown-item').forEach(item => item.classList.remove('active'));
    
    const selectedSubItem = document.getElementById(`subitem-${companyId}`);
    if (selectedSubItem) selectedSubItem.classList.add('active');
    
    document.getElementById('selectedOptionSub').innerText = selectedSubItem.innerText;
    document.getElementById('dropdownPanelSub').classList.remove('open');
    
    renderScene('japan');
}

function renderScene(type) {
    clearCurrentScene();
    
    const titleElem = document.getElementById('panel-title');

    if (type === 'robots') {
        titleElem.innerText = "Ключові локації та ланцюжки постачання Boston Dynamics";
        
        robotLocations.forEach(loc => {
            const iconHtml = loc.isHub 
                ? `<div class="custom-marker-wrapper"><div class="marker-dot dot-hub-robot"></div></div>`
                : `<div class="custom-marker-wrapper"><div class="marker-dot dot-robot"></div></div>`;
            
            const customIcon = L.divIcon({
                className: '',
                html: iconHtml,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            let specsHtml = '';
            if (loc.specs) {
                specsHtml = `<div class="specs-grid">` + 
                    loc.specs.map(s => `<div class="spec-item"><span>${s.k}</span><span>${s.v}</span></div>`).join('') +
                    `</div>`;
            }

            const popupHtml = `
                <div class="card-img-wrap"><img src="${loc.image}" alt="${loc.title}"></div>
                <div class="card-body">
                    <span class="card-badge badge-robot">${loc.badge}</span>
                    <div class="popup-title">${loc.title}</div>
                    <div class="popup-company">${loc.company}</div>
                    <div class="card-section-label">Роль у ланцюгу:</div>
                    <div class="card-role-text">${loc.role}</div>
                    <div class="popup-desc">${loc.text}</div>
                    ${specsHtml}
                </div>
            `;

            const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
            marker.bindPopup(popupHtml);
            currentMarkers.push(marker);

            if (!loc.isHub) {
                const line = L.polyline([loc.coords, WALTHAM_COORDS], {
                    className: 'supply-line-robot'
                }).addTo(map);
                currentLines.push(line);
            }
        });

        map.flyTo([30, 0], 2.5);
    } 
    else if (type === 'construction') {
        titleElem.innerText = "Будівельні компанії США та джерела цементу";

        constructionLocations.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-marker-wrapper"><div class="marker-dot dot-construction"></div></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="card-badge badge-construction">Будівельна компанія</span>
                    <div class="popup-title">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        cementLocations.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-marker-wrapper"><div class="marker-dot dot-cement"></div></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="card-badge badge-cement">Цементний завод</span>
                    <div class="popup-title">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        cementSupplyRoutes.forEach(route => {
            const line = L.polyline([route.from, route.to], {
                color: '#a855f7',
                weight: 2,
                opacity: 0.8,
                dashArray: '6, 6',
                className: 'supply-line-custom'
            }).addTo(map);
            line.bindTooltip(route.label, { sticky: true });
            currentLines.push(line);
        });

        map.flyTo([39.8283, -98.5795], 4);
    }
    else if (type === 'canada-construction') {
        titleElem.innerText = "Будівництво та цементні заводи Канади";

        canadaConstructionLocations.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-canada-construction-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-canada-construction">Канада Будівництво</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        canadaCementPlants.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-canada-cement-marker"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-canada-cement">Цементний Завод</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.name}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        map.flyTo([56.1304, -106.3468], 4);
    }
    else if (type === 'india-cement') {
        titleElem.innerText = "Будівельні компанії та цементні заводи Індії";

        indiaConstructionLocations.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-india-construction-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-india-construction">Будівництво Індії</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        indiaCementPlants.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-india-cement-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-india-cement">Цементний Завод</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);

            if (loc.targetCoords) {
                const line = L.polyline([loc.coords, loc.targetCoords], {
                    color: '#ff0055',
                    weight: 2,
                    opacity: 0.8,
                    className: 'logistics-line-india'
                }).addTo(map);
                line.bindTooltip(`${loc.title} ➔ ${loc.targetName}`, { sticky: true });
                currentLines.push(line);
            }

            if (loc.targets) {
                loc.targets.forEach(targetCoord => {
                    const line = L.polyline([loc.coords, targetCoord], {
                        color: '#ff0055',
                        weight: 2,
                        opacity: 0.8,
                        className: 'logistics-line-india'
                    }).addTo(map);
                    currentLines.push(line);
                });
            }
        });

        map.flyTo([20.5937, 78.9629], 5);
    }
    else if (type === 'wire-logistics') {
        titleElem.innerText = "Китайські виробники мідного дроту та глобальні споживачі";

        chinaWireLocations.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-factory-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-wire">Виробник Дроту</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);

            wireDestinationsLocations.forEach(dest => {
                const line = L.polyline([loc.coords, dest.coords], {
                    color: '#ff3333',
                    weight: 1.5,
                    opacity: 0.6,
                    className: 'animated-route-stage1'
                }).addTo(map);
                currentLines.push(line);
            });
        });

        wireDestinationsLocations.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-destination-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-dest">Споживач / Хаб</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        map.flyTo([30, 110], 3);
    }
    else if (type === 'routes') {
        titleElem.innerText = "Глобальні ланцюги постачання міді та високотехнологічних компонентів";

        plantLocations.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-plant-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-refinery">Рафінувальний Завод</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        componentSuppliers.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-component-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-component">Компоненти & Вузли</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        finalFactories.forEach(loc => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="custom-final-marker"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });
            const marker = L.marker(loc.coords, { icon }).addTo(map);
            marker.bindPopup(`
                <div class="card-body">
                    <span class="popup-tag tag-final">Фінальне Виробництво</span>
                    <div class="popup-title" style="margin-top:6px;">${loc.title}</div>
                    <div class="popup-desc" style="margin-top:8px;">${loc.text}</div>
                </div>
            `);
            currentMarkers.push(marker);
        });

        fullSupplyChains.forEach(chain => {
            const color = chain.stage === 1 ? '#00d2ff' : '#e040fb';
            const className = chain.stage === 1 ? 'animated-route-stage1' : 'animated-route-stage2';

            const line = L.polyline([chain.from, chain.to], {
                color: color,
                weight: 2,
                opacity: 0.8,
                className: className
            }).addTo(map);

            line.bindTooltip(chain.label, { sticky: true });
            currentLines.push(line);
        });

        map.flyTo([20, 80], 2.5);
    }
    else if (type === 'japan') {
        titleElem.innerText = "Енергетична інфраструктура та електростанції Японії";

        const filteredCompanies = (selectedCompanyId === 'all')
            ? japanCompanies
            : japanCompanies.filter(c => c.id === selectedCompanyId);

        filteredCompanies.forEach(comp => {
            comp.plants.forEach(plant => {
                const iconHtml = `<div class="custom-marker-wrapper">
                    <div class="marker-dot" style="width:16px; height:16px; background-color:${comp.color}; box-shadow:0 0 10px ${comp.color};"></div>
                </div>`;

                const icon = L.divIcon({
                    className: '',
                    html: iconHtml,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                });

                const marker = L.marker(plant.coords, { icon }).addTo(map);
                marker.bindPopup(`
                    <div class="card-body">
                        <span class="card-badge" style="background:${comp.color}22; color:${comp.color}; border:1px solid ${comp.color};">${plant.type}</span>
                        <div class="popup-title">${plant.name}</div>
                        <div class="popup-company" style="color:${comp.color};">${comp.name}</div>
                        <div class="popup-desc">${plant.role}</div>
                        <div class="specs-grid" style="margin-top:8px;">
                            <div class="spec-item"><span>Потужність</span><span>${plant.cap}</span></div>
                            <div class="spec-item"><span>Компанія</span><span>${comp.name}</span></div>
                        </div>
                    </div>
                `);
                currentMarkers.push(marker);
            });
        });

        map.flyTo([36.2048, 138.2529], 5.5);
    }
}
