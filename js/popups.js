function createCardHtml(loc, type) {
            const isRobot = (type === 'robots');
            const badgeClass = isRobot ? 'badge-robot' : 'badge-construction';
            const badgeText = isRobot ? (loc.badge || 'Робототехніка') : 'Будівництво США';

            let imgHtml = loc.image ? `
                <div class="card-img-wrap">
                    <img src="${loc.image}" alt="${loc.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80';" />
                </div>
            ` : '';

            let companyHtml = loc.company ? `<div class="popup-company">${loc.company}</div>` : '';
            
            let roleHtml = loc.role ? `
                <div class="card-section-label">Функціональна роль</div>
                <div class="card-role-text">${loc.role}</div>
            ` : '';

            let textHtml = loc.text ? `
                <div class="card-section-label">${isRobot ? 'Опис компонентів' : 'Спеціалізація та потужність'}</div>
                <div class="popup-desc">${loc.text}</div>
            ` : '';

            let specsItems = (loc.specs && loc.specs.length > 0) ? `
                <div class="specs-grid">
                    ${loc.specs.map(s => `
                        <div class="spec-item">
                            <span>${s.k}</span>
                            <span>${s.v}</span>
                        </div>
                    `).join('')}
                </div>
            ` : '';

            return `
                ${imgHtml}
                <div class="card-body">
                    <span class="card-badge ${badgeClass}">${badgeText}</span>
                    <div class="popup-title">${loc.title}</div>
                    ${companyHtml}
                    ${roleHtml}
                    ${textHtml}
                    ${specsItems}
                </div>
            `;
        }

function createJapanCardHtml(loc, hexColor) {
            let specsItems = (loc.specs || []).map(s => `
                <div class="spec-item">
                    <span>${s.k}</span>
                    <span>${s.v}</span>
                </div>
            `).join('');

            return `
                <div class="card-img-wrap">
                    <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80" alt="${loc.company}" />
                </div>
                <div class="card-body">
                    <span class="card-badge" style="background: ${hexColor}22; color: ${hexColor}; border: 1px solid ${hexColor}66;">${loc.badge || 'Електростанція'}</span>
                    <div class="popup-title">${loc.title}</div>
                    <div class="popup-company" style="color: ${hexColor};">${loc.company}</div>
                    
                    <div class="card-section-label">Призначення / Роль</div>
                    <div class="card-role-text">${loc.role}</div>

                    <div class="card-section-label">Опис об'єкта</div>
                    <div class="popup-desc">${loc.text || ''}</div>

                    <div class="specs-grid">
                        ${specsItems}
                    </div>
                </div>
            `;
        }
