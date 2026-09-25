// 1. Імпорт даних з усіх модулів
import { robotLocations } from './data/robotics.js';
import { constructionLocations, cementLocations, cementSupplyRoutes } from './data/construction/usa.js';
import { canadaConstructionLocations, canadaCementPlants } from './data/construction/canada.js';
import { indiaConstructionLocations, indiaCementPlants } from './data/construction/india.js';
import { chinaWireLocations, wireDestinationsLocations } from './data/wire_logistics.js';
import { plantLocations, componentSuppliers, finalFactories, fullSupplyChains } from './data/supply_chains.js';
import { japanCompanies } from './data/energy/japan.js';

const WALTHAM_COORDS = [42.3765, -71.2356];

let map;
let currentMarkers = [];
let currentLines = [];
let selectedCompanyId = 'all';

// 2. Ініціалізація карти після завантаження DOM
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

// 3. Всі допоміжні функції карти (clearLayers, createCardHtml, renderScene тощо)
function clearLayers() {
    currentMarkers.forEach(m => map.removeLayer(m));
    currentLines.forEach(l => map.removeLayer(l));
    currentMarkers = [];
    currentLines = [];
}

// ... Перенесіть сюди функції:
// buildSubDropdownMenu, toggleDropdown, createCardHtml, createJapanCardHtml, 
// createCurvePoints, drawPairConnections, renderWireLogisticsView, renderFullSupplyChain,
// renderConstructionView, renderCanadaConstructionWithSupplyChain, 
// renderIndiaCementWithLogistics, renderJapanPowerPlantsView, renderScene

function selectOption(type) {
    const title = document.getElementById('panel-title');
    const selectedText = document.getElementById('selectedOptionMain');
    const itemRobots = document.getElementById('item-robots');
    const itemConstruction = document.getElementById('item-construction');
    const itemCanadaConstruction = document.getElementById('item-canada-construction');
    const itemIndiaCement = document.getElementById('item-india-cement');
    const itemWireLogistics = document.getElementById('item-wire-logistics');
    const itemRoutes = document.getElementById('item-routes');
    const itemJapan = document.getElementById('item-japan');
    const subPanel = document.getElementById('dropdownPanelSub');

    [itemRobots, itemConstruction, itemCanadaConstruction, itemIndiaCement, itemWireLogistics, itemRoutes, itemJapan].forEach(el => {
        if (el) el.classList.remove('active');
    });

    if (type === 'robots') {
        selectedText.innerText = "🤖 Boston Dynamics";
        itemRobots.classList.add('active');
        title.innerText = "Ключові локації та ланцюжки постачання Boston Dynamics";
        subPanel.style.display = 'none';
        renderScene('robots');
        map.setView([25, 10], 3);
    } else if (type === 'construction') {
        selectedText.innerText = "🏗️ Будівельні компанії & Цемент";
        itemConstruction.classList.add('active');
        title.innerText = "Будівельні компанії та цементні заводи США з логістичними лініями";
        subPanel.style.display = 'none';
        renderConstructionView();
    } else if (type === 'canada-construction') {
        selectedText.innerText = "🇨🇦 Будівництво (Канада)";
        if (itemCanadaConstruction) itemCanadaConstruction.classList.add('active');
        title.innerText = "Будівельні компанії, цементні заводи та логістичні зв'язки в Канаді";
        subPanel.style.display = 'none';
        renderCanadaConstructionWithSupplyChain();
    } else if (type === 'india-cement') {
        selectedText.innerText = "🧱 Будівельні компанії Індії та цементні заводи";
        if (itemIndiaCement) itemIndiaCement.classList.add('active');
        title.innerText = "Будівельні компанії Індії, цементні заводи та логістичні лінії постачання";
        subPanel.style.display = 'none';
        renderIndiaCementWithLogistics();
    } else if (type === 'wire-logistics') {
        selectedText.innerText = "🏭 Дріт та 🚢 Логістика";
        itemWireLogistics.classList.add('active');
        title.innerText = "Виробництво дроту (Китай) та Глобальна Логістика";
        subPanel.style.display = 'none';
        renderWireLogisticsView();
    } else if (type === 'routes') {
        selectedText.innerText = "🚚 Ланцюги постачання";
        itemRoutes.classList.add('active');
        title.innerText = "Глобальні ланцюги: Мідь → Деталі → Продукція (Індонезія, Японія, США, ФРН, Китай, Корея)";
        subPanel.style.display = 'none';
        renderFullSupplyChain();
    } else if (type === 'japan') {
        selectedText.innerText = "⚡ Електростанції Японії";
        itemJapan.classList.add('active');
        title.innerText = "Мережі електростанцій енергетичних компаній Японії";
        subPanel.style.display = 'block';
        renderJapanPowerPlantsView();
    }

    document.getElementById('dropdownPanelMain').classList.remove('open');
}

function selectCompany(companyId) {
    selectedCompanyId = companyId;
    
    const subItems = document.querySelectorAll('#subDropdownContent .dropdown-item');
    subItems.forEach(item => item.classList.remove('active'));

    const activeBtn = document.getElementById(`sub-${companyId}`);
    if (activeBtn) activeBtn.classList.add('active');

    const selectedTextSub = document.getElementById('selectedOptionSub');
    if (companyId === 'all') {
        selectedTextSub.innerText = "🏢 Всі компанії";
    } else {
        const compObj = japanCompanies.find(c => c.id === companyId);
        selectedTextSub.innerText = compObj ? compObj.name : "🏢 Всі компанії";
    }

    renderJapanPowerPlantsView();
    document.getElementById('dropdownPanelSub').classList.remove('open');
}

// 4. Експорт функцій у глобальну область видимості window, 
// щоб працювали атрибути onclick="..." в HTML-меню
window.toggleDropdown = toggleDropdown;
window.selectOption = selectOption;
window.selectCompany = selectCompany;