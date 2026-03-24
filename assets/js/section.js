const sectionsData = [healthcareData, realEstateData, wineEstateData];

function renderSections(data = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("content-container");
    if (!Array.isArray(data) || !data.length) {
        const filterElement = document.getElementById("filter-id");
        const filterValue = filterElement?.value || '';
        container.innerHTML = `<p class="text-muted"><i class="bi bi-exclamation-square"></i> No results found for filter '${filterValue}'.</p>`;
        return;
    }
    container.innerHTML = data.map((section, i) => {
        const content = filtered
            ? renderFilteredItems(section)
            : hasOnlyLevel2Items(section)
                ? renderItemsLevel2(section.items)
                : renderItemsLevel3(section.items);
        return `
        <section class="mb-3 border-bottom ${filtered ? 'filtered' : ''}" data-section="${i}">
            <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                <span class="section-title-with-filter-icon">
                    ${section.label}
                    ${filtered ? `<span class="filtered-icon"><i class="bi bi-funnel"></i></span>` : ''}
                </span>
                ${filtered ? '' : '<i class="bi bi-chevron-down chevron-icon"></i>'}
            </h2>
            <div class="section-content" style="display:${open ? 'block' : 'none'}" data-loaded="true">
                ${content}
            </div>
        </section>
        `;
    }).join("");
}

function renderFilteredItems(section) {
    if (!section.items?.length) return '<p class="text-muted">No data found.</p>';
    const uniqueItems = Array.from(new Map(section.items.map(i => [i.name, i])).values());
    const sortedItems = uniqueItems.sort((a, b) => a.name.localeCompare(b.name));
    return `<ul class="list-unstyled mb-2 filtered-list">
        ${sortedItems.map(i => `<li><a href="#" data-name="${i.name}">${i.name}</a></li>`).join('')}
    </ul>`;
}

function renderItemsLevel2(items = [], wrapRow = true) {
    const filteredItems = (items || []).filter(level2 => level2.items && level2.items.length);
    if (!filteredItems.length) return '';
    const content = filteredItems.map(level2 => `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card h-100">
                <div class="card-body">
                    <h3 class="h6 mb-3">${level2.label}</h3>
                    ${renderLinks(level2.items)}
                </div>
            </div>
        </div>
    `).join("");
    function renderLinks(items = []) {
        if (!items.length) return '';
        return `<ul class="list-unstyled mb-0">
            ${items.map(item => `<li><a href="#" data-name="${item.name}">${item.name}</a></li>`).join("")}
        </ul>`;
    }
    return wrapRow ? `<div class="row">${content}</div>` : content;
}

function renderItemsLevel3(level2Items = []) {
    return level2Items.map((level2, i) => `
        <section class="level2-section mb-2" data-level2="${i}">
            <h3 class="h6 d-flex justify-content-between align-items-center level2-header">
                <span>${level2.label}</span>
                <i class="bi bi-chevron-down chevron-icon"></i>
            </h3>
            <div class="level2-content" style="display:none;">
                ${renderItemsLevel2(level2.items, true)}
            </div>
        </section>
    `).join("");
}

function renderFilteredSections(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderSections(sectionsData, false, false);
        return;
    }
    const filteredData = sectionsData.map(section => {
        const matchedItems = [];
        if (hasOnlyLevel2Items(section)) { // Level1 + Level2
            section.items?.forEach(level1 => {
                level1.items?.forEach(level2 => {
                    if (level2.name && level2.name.toLowerCase().includes(q)) {
                        matchedItems.push(level2);
                    }
                });
            });
        } else { // Level1 + Level2 + Level3
            section.items?.forEach(level1 => {
                level1.items?.forEach(level2 => {
                    level2.items?.forEach(level3 => {
                        if (level3.name && level3.name.toLowerCase().includes(q)) {
                            matchedItems.push(level3);
                        }
                    });
                });
            });
        }
        return matchedItems.length ? { label: section.label, items: matchedItems } : null;
    }).filter(Boolean);
    renderSections(filteredData, true, true);
}

function hasOnlyLevel2Items(section) {
    return !section.items?.some(level1 =>
        Array.isArray(level1.items) && level1.items.some(level2 =>
            level2.label && Array.isArray(level2.items)
        )
    );
}

function initSectionEvents() {
    document.getElementById("content-container").addEventListener("click", (e) => {
        if (
            e.target.closest('[data-bs-toggle="tab"]') ||
            e.target.closest('.dropdown-menu') ||
            e.target.closest('.dropdown-toggle')
        ) return;
        const section = e.target.closest("section");
        if (!section) return;
        const content = section.querySelector(".section-content");
        const isOpen = section.classList.contains("open");
        document.querySelectorAll("section").forEach(s => {
            s.classList.remove("open");
            const c = s.querySelector(".section-content");
            if (c) c.style.display = "none";
        });
        if (!isOpen) {
            section.classList.add("open");
            content.style.display = "block";
        }
    });
}