function buildSubDropdownMenu() {
    const subContainer = document.getElementById('subDropdownContent');
    if (!subContainer) return;
    subContainer.innerHTML = '';
}

function toggleDropdown(id) {
    const panel = document.getElementById(id);
    if (panel) panel.classList.toggle('open');
}

window.addEventListener('click', function(e) {
    ['dropdownPanelMain', 'dropdownPanelSub', 'dropdownPanelThird'].forEach(id => {
        const panel = document.getElementById(id);
        if (panel && !panel.contains(e.target)) panel.classList.remove('open');
    });
});

function showSubMenu(items) {
    const panel = document.getElementById('dropdownPanelSub');
    const content = document.getElementById('subDropdownContent');
    if (!panel || !content) return;

    content.innerHTML = items.map(item =>
        '<button class="dropdown-item" onclick="' + item.action + '">' + item.label + '</button>'
    ).join('');

    panel.style.display = 'block';
    panel.classList.remove('open');
}

function hideSubMenu() {
    const panel = document.getElementById('dropdownPanelSub');
    if (panel) {
        panel.style.display = 'none';
        panel.classList.remove('open');
    }
}

function setMainSelection(text) {
    const selectedText = document.getElementById('selectedOptionMain');
    if (selectedText) selectedText.innerText = text;
}

function selectOption(type) {
    const title = document.getElementById('panel-title');
    const itemRobots = document.getElementById('item-robots');
    const itemConstruction = document.getElementById('item-construction');
    const itemEnergy = document.getElementById('item-energy');
    const itemMinerals = document.getElementById('item-minerals');

    [itemRobots, itemConstruction, itemEnergy, itemMinerals].forEach(el => {
        if (el) el.classList.remove('active');
    });

    hideSubMenu();

    if (type === 'robots') {
        setMainSelection('🤖 Робототехніка');
        itemRobots.classList.add('active');
        title.innerText = 'Робототехніка';
        showRobotCompanies();
        selectRobotCompany('boston-dynamics');
        map.setView([25, 10], 3);

    } else if (type === 'construction') {
        setMainSelection('🏗️ Будівництво');
        itemConstruction.classList.add('active');
        title.innerText = 'Будівництво';
        showSubMenu([
            {
                label: '🇺🇸 США',
                action: "selectConstructionCountry('usa')"
            },
            {
                label: '🇨🇦 Канада',
                action: "selectConstructionCountry('canada')"
            },
            {
                label: '🇮🇳 Індія',
                action: "selectConstructionCountry('india')"
            }
        ]);

    } else if (type === 'energy') {
        setMainSelection('⚡ Енергетика');
        itemEnergy.classList.add('active');
        title.innerText = 'Енергетика';
        showSubMenu([
            {
                label: '🇯🇵 Японія',
                action: "selectEnergyCountry('japan')"
            }
        ]);

    } else if (type === 'minerals') {
        setMainSelection('⛏️ Мінерали');
        itemMinerals.classList.add('active');
        title.innerText = 'Мінерали';
        showSubMenu([
            {
                label: '🔶 Мідь',
                action: "selectMineral('copper')"
            }
        ]);
    }

    document.getElementById('dropdownPanelMain').classList.remove('open');
}

function showRobotCompanies() {
    const companies = [
        ['tesla', 'Tesla'],
        ['figure-ai', 'Figure AI'],
        ['boston-dynamics', 'Boston Dynamics'],
        ['agility-robotics', 'Agility Robotics'],
        ['apptronik', 'Apptronik'],
        ['sanctuary-ai', 'Sanctuary AI'],
        ['1x-technologies', '1X Technologies'],
        ['unitree-robotics', 'Unitree Robotics'],
        ['ubtech-robotics', 'UBTECH Robotics'],
        ['agiBot-zhiyuan', 'AgiBot / Zhiyuan Robotics'],
        ['fourier-intelligence', 'Fourier Intelligence'],
        ['kepler-exploration', 'Kepler Exploration Robotics'],
        ['robotera', 'RobotEra'],
        ['xiaomi-robotics', 'Xiaomi Robotics'],
        ['xpeng-robotics-iron', 'XPENG Robotics / Iron (Китай)'],
        ['hanson-robotics', 'Hanson Robotics'],
        ['rainbow-robotics', 'Rainbow Robotics'],
        ['neura-robotics', 'NEURA Robotics'],
        ['pal-robotics', 'PAL Robotics'],
        ['engineered-arts', 'Engineered Arts']
    ];

    showSubMenu(companies.map(([id, label]) => ({
        label: '🤖 ' + label,
        action: "selectRobotCompany('" + id + "')"
    })));
    document.querySelectorAll('#subDropdownContent .dropdown-item').forEach((btn, index) => {
        btn.id = 'robot-' + companies[index][0];
    });
}

function selectRobotCompany(companyId) {
    const labels = {
        'tesla': 'Tesla',
        'figure-ai': 'Figure AI',
        'boston-dynamics': 'Boston Dynamics',
        'agility-robotics': 'Agility Robotics',
        'apptronik': 'Apptronik',
        'sanctuary-ai': 'Sanctuary AI',
        '1x-technologies': '1X Technologies',
        'unitree-robotics': 'Unitree Robotics',
        'ubtech-robotics': 'UBTECH Robotics',
        'agiBot-zhiyuan': 'AgiBot / Zhiyuan Robotics',
        'fourier-intelligence': 'Fourier Intelligence',
        'kepler-exploration': 'Kepler Exploration Robotics',
        'robotera': 'RobotEra',
        'xiaomi-robotics': 'Xiaomi Robotics',
        'xpeng-robotics-iron': 'XPENG Robotics / Iron (Китай)',
        'hanson-robotics': 'Hanson Robotics',
        'rainbow-robotics': 'Rainbow Robotics',
        'neura-robotics': 'NEURA Robotics',
        'pal-robotics': 'PAL Robotics',
        'engineered-arts': 'Engineered Arts'
    };

    const title = document.getElementById('panel-title');
    const selectedTextSub = document.getElementById('selectedOptionSub');

    if (title) title.innerText = 'Робототехніка — ' + (labels[companyId] || 'Компанія');
    if (selectedTextSub) selectedTextSub.innerText = '🤖 ' + (labels[companyId] || 'Компанія');

    document.querySelectorAll('#subDropdownContent .dropdown-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeBtn = document.getElementById('robot-' + companyId);
    if (activeBtn) activeBtn.classList.add('active');

    selectedRobotCompanyId = companyId;
    renderRobotCompany(companyId);
    document.getElementById('dropdownPanelSub')?.classList.remove('open');
}

function selectConstructionCountry(country) {
    const title = document.getElementById('panel-title');

    if (country === 'usa') {
        title.innerText = 'Будівельні компанії та цементні заводи США з логістичними лініями';
        showSubMenu([
            {
                label: '🏗️ Будівельні компанії США & Цемент США',
                action: "selectConstructionScene('usa')"
            }
        ]);
    } else if (country === 'canada') {
        title.innerText = 'Будівельні компанії, цементні заводи та логістичні зв\'язки в Канаді';
        showSubMenu([
            {
                label: '🏗️ Будівництво (Канада)',
                action: "selectConstructionScene('canada')"
            }
        ]);
    } else if (country === 'india') {
        title.innerText = 'Будівельні компанії Індії, цементні заводи та логістичні лінії постачання';
        showSubMenu([
            {
                label: '🧱 Будівельні компанії Індії та цементні заводи',
                action: "selectConstructionScene('india')"
            }
        ]);
    }
}

function selectConstructionScene(country) {
    hideSubMenu();

    if (country === 'usa') {
        document.getElementById('panel-title').innerText =
            'Будівельні компанії та цементні заводи США з логістичними лініями';
        renderConstructionView();
    } else if (country === 'canada') {
        document.getElementById('panel-title').innerText =
            'Будівельні компанії, цементні заводи та логістичні зв\'язки в Канаді';
        renderCanadaConstructionWithSupplyChain();
    } else if (country === 'india') {
        document.getElementById('panel-title').innerText =
            'Будівельні компанії Індії, цементні заводи та логістичні лінії постачання';
        renderIndiaCementWithLogistics();
    }
}

function selectEnergyCountry(country) {
    if (country !== 'japan') return;

    const title = document.getElementById('panel-title');
    title.innerText = 'Мережі електростанцій енергетичних компаній Японії';
    showSubMenu([
        {
            label: '⚡ Електростанції Японії',
            action: "selectEnergyScene('japan')"
        }
    ]);
}

function selectEnergyScene(country) {
    if (country !== 'japan') return;

    hideSubMenu();

    const panel = document.getElementById('dropdownPanelSub');
    const content = document.getElementById('subDropdownContent');

    // Після вибору Японії зберігаємо існуючий фільтр енергетичних компаній.
    content.innerHTML =
        '<button class="dropdown-item active" id="sub-all" onclick="selectCompany(\'all\')">🏢 Всі компанії</button>' +
        (window.countryData.energy?.japan?.japanCompanies || []).map(comp =>
            '<button class="dropdown-item" id="sub-' + comp.id + '" onclick="selectCompany(\'' + comp.id + '\')">' +
            '<span class="company-color-indicator" style="background-color: ' + comp.color + ';"></span>' +
            comp.name +
            '</button>'
        ).join('');

    panel.style.display = 'block';
    renderJapanPowerPlantsView();
}

function selectMineral(type) {
    if (type !== 'copper') return;

    document.getElementById('panel-title').innerText = 'Мідь';
    showSubMenu([
        {
            label: '🇯🇵 Японія',
            action: "selectCopperCountry('japan')"
        },
        {
            label: '🇮🇩 Індонезія',
            action: "selectCopperCountry('indonesia')"
        }
    ]);
}

function selectCopperCountry(country) {
    const title = document.getElementById('panel-title');

    if (country === 'japan') {
        title.innerText = 'Мідь — Японія';
        hideSubMenu();
        renderScene('minerals');
    } else if (country === 'indonesia') {
        title.innerText = 'Мідь — Ланцюги постачання Індонезії';
        showSubMenu([
            {
                label: '🚚 Ланцюги постачання',
                action: "selectCopperScene('indonesia')"
            }
        ]);
    }
}

function selectCopperScene(country) {
    if (country !== 'indonesia') return;

    hideSubMenu();
    document.getElementById('panel-title').innerText =
        'Глобальні ланцюги: Мідь → Деталі → Продукція (Індонезія, Японія, США, ФРН, Китай, Корея)';
    renderFullSupplyChain();
}

function selectCompany(companyId) {
    selectedCompanyId = companyId;

    const subItems = document.querySelectorAll('#subDropdownContent .dropdown-item');
    subItems.forEach(item => item.classList.remove('active'));

    const activeBtn = document.getElementById('sub-' + companyId);
    if (activeBtn) activeBtn.classList.add('active');

    const selectedTextSub = document.getElementById('selectedOptionSub');
    if (selectedTextSub) {
        if (companyId === 'all') {
            selectedTextSub.innerText = '🏢 Всі компанії';
        } else {
            const compObj = (window.countryData.energy?.japan?.japanCompanies || [])
                .find(c => c.id === companyId);
            selectedTextSub.innerText = compObj ? compObj.name : '🏢 Всі компанії';
        }
    }

    renderJapanPowerPlantsView();
    document.getElementById('dropdownPanelSub').classList.remove('open');
}
