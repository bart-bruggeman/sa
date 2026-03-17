function renderSections(data = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("section-container");
    if (!Array.isArray(data) || !data.length) {
        container.innerHTML = `<p class="text-muted">No results found.</p>`;
        return;
    }
    container.innerHTML = data.map((section, i) => renderSection(section, i, open, filtered)).join("");

    function renderSection(section, index, open, filtered) {
        const isLevel2 = isProcessLevel2(section);
        const content = isLevel2 
            ? renderItemsLevel2(section.items) 
            : renderItemsLevel3(section.items);
        return `
            <section class="mb-3 border-bottom ${open ? 'open' : ''}" data-section="${index}">
                <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                    <span class="section-title-with-badge">
                        ${section.label}
                        ${filtered ? '<span class="badge text-bg-warning ms-1 align-text-top">filtered data</span>' : ''}
                    </span>
                    <i class="bi bi-chevron-down"></i>
                </h2>
                <div class="section-content" style="display:${open ? 'block' : 'none'}" data-loaded="true">
                    ${content}
                </div>
            </section>
        `;
    }

function renderItemsLevel2(items = [], wrapRow = true) {
    if (!items.length) return '';
    const content = items.map(sub => `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h3 class="h6 mb-3">${sub.label}</h3>
                    ${renderLinks(sub.items)}
                </div>
            </div>
        </div>
    `).join("");
    return wrapRow ? `<div class="row g-4">${content}</div>` : content;
}

function renderItemsLevel3(level1bItems = []) {
    if (!level1bItems.length) return '';
    return level1bItems.map(level1b => `
        <div class="mb-4 p-3 section-box rounded">
            <h4 class="h6 mb-3">${level1b.label}</h4>
            ${renderItemsLevel2(level1b.items, true)}
        </div>
    `).join("");
}

    function renderLinks(links = []) {
        if (!links.length) return '';
        return `<ul class="list-unstyled mb-0">
            ${links.map(l => `<li><a href="#" data-name="${l.name}">${l.name}</a></li>`).join("")}
        </ul>`;
    }
}

function renderFilteredSections(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderSections(sectionsData, false, false);
        return;
    }
    const filteredSectionsData = filterData(sectionsData, q);
    renderSections(filteredSectionsData, true, true);

    function filterData(data, q) {
        if (!q) return data;
        return data.map(section => {
            const isLevel2 = isProcessLevel2(section);
            const result = { label: section.label };
            if (isLevel2) {
                if (section.items) {
                    result.items = section.items
                        .map(sub => ({
                            label: sub.label,
                            items: sub.items.filter(i => i.name.toLowerCase().includes(q))
                        }))
                        .filter(sub => sub.items.length);
                }
                if (section.links) {
                    result.links = section.links.filter(l => l.name.toLowerCase().includes(q));
                }
            } else {
                if (section.items) {
                    result.items = section.items
                        .map(level1b => {
                            const newLevel1b = { label: level1b.label };
                            if (level1b.items) {
                                newLevel1b.items = level1b.items
                                    .map(level2 => ({
                                        label: level2.label,
                                        items: level2.items.filter(i => i.name.toLowerCase().includes(q))
                                    }))
                                    .filter(level2 => level2.items.length);
                            }
                            return newLevel1b.items?.length ? newLevel1b : null;
                        })
                        .filter(Boolean);
                }
            }
            return (result.items?.length || result.links?.length) ? result : null;
        }).filter(Boolean);
    }
}

function isProcessLevel2(section) {
    return !section.items?.some(level1b =>
        Array.isArray(level1b.items) &&
        level1b.items.some(level2 => level2.label && Array.isArray(level2.items))
    );
}