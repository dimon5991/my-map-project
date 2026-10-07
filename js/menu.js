function buildSubDropdownMenu() {
            const subContainer = document.getElementById('subDropdownContent');
            let html = `<button class="dropdown-item active" id="sub-all" onclick="selectCompany('all')">🏢 Всі компанії</button>`;
            
            (window.countryData.energy?.japan?.japanCompanies || []).forEach(comp => {
                html += `
                    <button class="dropdown-item" id="sub-${comp.id}" onclick="selectCompany('${comp.id}')">
                        <span class="company-color-indicator" style="background-color: ${comp.color};"></span>
                        ${comp.name}
                    </button>
                `;
            });

            subContainer.innerHTML = html;
        }

function toggleDropdown(id) {
            const panel = document.getElementById(id);
            panel.classList.toggle('open');
        }

window.addEventListener('click', function(e) {
    ['dropdownPanelMain', 'dropdownPanelSub'].forEach(id => {
        const panel = document.getElementById(id);
        if (panel && !panel.contains(e.target)) panel.classList.remove('open');
    });
});

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
                const compObj = (window.countryData.energy?.japan?.japanCompanies || []).find(c => c.id === companyId);
                selectedTextSub.innerText = compObj ? compObj.name : "🏢 Всі компанії";
            }

            renderJapanPowerPlantsView();
            document.getElementById('dropdownPanelSub').classList.remove('open');
        }