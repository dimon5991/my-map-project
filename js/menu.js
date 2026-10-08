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
        document.getElementById('dropdownPanelSub')?.classList.add('open');
        map.setView([25, 10], 3);

    } else if (type === 'construction') {
        setMainSelection('🏗️ Будівництво');
        itemConstruction.classList.add('active');
        title.innerText = 'Будівництво';
        showContinentMenu('construction');

    } else if (type === 'energy') {
        setMainSelection('⚡ Енергетика');
        itemEnergy.classList.add('active');
        title.innerText = 'Енергетика';
        showContinentMenu('energy');

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

const continentCountries = {
    asia: ['afghanistan','armenia','azerbaijan','bahrain','bangladesh','bhutan','brunei','cambodia','china','georgia','india','indonesia','iran','iraq','israel','japan','jordan','kazakhstan','kuwait','kyrgyzstan','laos','lebanon','malaysia','maldives','mongolia','myanmar','nepal','north_korea','oman','pakistan','palestine','philippines','qatar','saudi_arabia','singapore','south_korea','sri_lanka','syria','taiwan','tajikistan','thailand','timor_leste','turkey','turkmenistan','united_arab_emirates','uzbekistan','vietnam','yemen'],
    europe: ['albania','andorra','austria','belarus','belgium','bosnia_and_herzegovina','bulgaria','croatia','cyprus','czechia','denmark','estonia','finland','france','greece','germany','hungary','iceland','ireland','italy','kosovo','latvia','liechtenstein','lithuania','luxembourg','malta','moldova','monaco','montenegro','netherlands','north_macedonia','norway','poland','portugal','romania','russia','san_marino','serbia','slovakia','slovenia','spain','sweden','switzerland','ukraine','united_kingdom','vatican_city'],
    africa: ['algeria','angola','benin','botswana','burkina_faso','burundi','cabo_verde','cameroon','central_african_republic','chad','comoros','congo','cote_d_ivoire','democratic_republic_of_the_congo','djibouti','egypt','equatorial_guinea','eritrea','eswatini','ethiopia','gabon','gambia','ghana','guinea','guinea_bissau','kenya','lesotho','liberia','libya','madagascar','malawi','mali','mauritania','mauritius','morocco','mozambique','namibia','niger','nigeria','rwanda','sao_tome_and_principe','senegal','seychelles','sierra_leone','somalia','south_africa','south_sudan','sudan','tanzania','togo','tunisia','uganda','zambia','zimbabwe'],
    north_america: ['antigua_and_barbuda','bahamas','barbados','belize','canada','costa_rica','cuba','dominica','dominican_republic','el_salvador','grenada','guatemala','haiti','honduras','jamaica','mexico','nicaragua','panama','saint_kitts_and_nevis','saint_lucia','saint_vincent_and_the_grenadines','trinidad_and_tobago','usa'],
    south_america: ['argentina','bolivia','brazil','chile','colombia','ecuador','guyana','paraguay','peru','suriname','uruguay','venezuela'],
    oceania: ['australia','fiji','kiribati','marshall_islands','micronesia','nauru','new_zealand','palau','papua_new_guinea','samoa','solomon_islands','tonga','tuvalu','vanuatu']
};

const continentLabels = {
    asia: '🌏 Азія',
    europe: '🌍 Європа',
    africa: '🌍 Африка',
    north_america: '🌎 Північна Америка',
    south_america: '🌎 Південна Америка',
    oceania: '🌏 Австралія та Океанія'
};

function formatCountryName(country) {
    return country.split('_').map(part => part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function showContinentMenu(type) {
    window.currentMenuType = type;
    showSubMenu(Object.keys(continentCountries).map(continent => ({
        label: continentLabels[continent],
        action: "selectContinent('" + type + "','" + continent + "')"
    })));
    document.getElementById('panel-title').innerText =
        type === 'construction' ? 'Будівництво — частина світу' : 'Енергетика — частина світу';
}

function selectContinent(type, continent) {
    window.currentMenuType = type;
    document.getElementById('panel-title').innerText =
        (type === 'construction' ? 'Будівництво — ' : 'Енергетика — ') + continentLabels[continent].replace(/^\S+\s*/, '');
    showSubMenu(continentCountries[continent].map(country => ({
        label: '📍 ' + formatCountryName(country),
        action: "selectCountryByContinent('" + type + "','" + continent + "','" + country + "')"
    })));
}

function loadCountryCategory(continent, country, category, callback) {
    window.countryData = window.countryData || {};
    window.countryData[category] = window.countryData[category] || {};
    if (window.countryData[category][country]) {
        callback();
        return;
    }

    const key = continent + '/' + country + '/' + category;
    window._loadedCountryScripts = window._loadedCountryScripts || {};
    if (window._loadedCountryScripts[key]) {
        const wait = setInterval(() => {
            if (window.countryData[category]?.[country]) {
                clearInterval(wait);
                callback();
            }
        }, 50);
        return;
    }

    window._loadedCountryScripts[key] = true;
    const script = document.createElement('script');
    script.src = 'data/continents/' + continent + '/' + country + '/' + category + '.js';
    script.onload = callback;
    script.onerror = callback;
    document.head.appendChild(script);
}

function selectCountryByContinent(type, continent, country) {
    hideSubMenu();
    const title = document.getElementById('panel-title');
    title.innerText = (type === 'construction' ? 'Будівництво — ' : 'Енергетика — ') + formatCountryName(country);

    loadCountryCategory(continent, country, type, () => {
        if (type === 'construction') {
            selectConstructionScene(country);
        } else {
            selectEnergyScene(country);
        }
    });
}

function selectConstructionCountry(country) {
    selectCountryByContinent('construction', country === 'usa' || country === 'canada' ? 'north_america' : 'asia', country);
}

function selectConstructionScene(country) {
    hideSubMenu();
    document.getElementById('panel-title').innerText =
        'Будівництво — ' + formatCountryName(country);

    if (country === 'usa') {
        renderConstructionView();
    } else if (country === 'canada') {
        renderCanadaConstructionWithSupplyChain();
    } else if (country === 'india') {
        renderIndiaCementWithLogistics();
    } else {
        renderGenericConstructionCountry(country);
    }
}

function selectEnergyCountry(country) {
    selectCountryByContinent('energy', 'asia', country);
}

function selectEnergyScene(country) {
    hideSubMenu();
    document.getElementById('panel-title').innerText =
        'Енергетика — ' + formatCountryName(country);

    if (country === 'japan') {
        renderJapanPowerPlantsView();
    } else {
        renderGenericEnergyCountry(country);
    }
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
