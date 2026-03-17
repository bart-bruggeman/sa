// ==================== Hoofd render ====================
function renderSections(data = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("section-container");
    if (!Array.isArray(data) || !data.length) {
        container.innerHTML = `<p class="text-muted">No results found.</p>`;
        return;
    }

    container.innerHTML = data.map((section, i) => {
        const is2Level = processLevel2orLevel3Section(section);
        if (is2Level) {
            return render2LevelSectionHTML(section, i, open, filtered);
        } else {
            return render3LevelSectionHTML(section, i, open, filtered);
        }
    }).join("");
}

// ==================== Detectie per section ====================
function processLevel2orLevel3Section(section) {
    // TRUE = 2-level, FALSE = 3-level
    // Als een section items bevat met level-1b (extra label/items), dan 3-level
    return !section.items?.some(level1b => 
        Array.isArray(level1b.items) &&
        level1b.items.some(level2 => level2.label && Array.isArray(level2.items))
    );
}

// ==================== Render 2-level section ====================
function render2LevelSectionHTML(section, index, open, filtered) {
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
                ${section.items ? `
                    <div class="row g-4">
                        ${section.items.map(sub => `
                            <div class="col-12 col-md-6 col-lg-3">
                                <h3 class="h6 mb-2 subcategory-title">${sub.label}</h3>
                                ${renderLinks(sub.items)}
                            </div>
                        `).join("")}
                    </div>
                ` : ''}
            </div>
        </section>
    `;
}

// ==================== Render 3-level section ====================
function render3LevelSectionHTML(section, index, open, filtered) {
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
                ${section.items.map(level1b => `
                    <h4 class="h6 mt-3 mb-2 level-1b-title">${level1b.label}</h4>
                    <div class="row g-4">
                        ${level1b.items.map(level2 => `
                            <div class="col-12 col-md-6 col-lg-3">
                                <h3 class="h6 mb-2 subcategory-title">${level2.label}</h3>
                                ${renderLinks(level2.items)}
                            </div>
                        `).join("")}
                    </div>
                `).join("")}
            </div>
        </section>
    `;
}

// ==================== Links helper ====================
function renderLinks(links) {
    if (!links) return "";
    return `
        <ul class="list-unstyled mb-0">
            ${links.map(l => `
                <li><a href="#" data-name="${l.name}">${l.name}</a></li>
            `).join("")}
        </ul>
    `;
}

// ==================== Filtering ====================
function renderFilteredSections(query) {
    const q = query.toLowerCase().trim();
    const filteredData = dataFilter(sectionsData, q);
    renderSections(filteredData, true, !!q); // open alle gefilterde sections
}

function dataFilter(data, q) {
    if (!q) return data;

    return data.map(section => {
        const is2Level = processLevel2orLevel3Section(section);
        const result = { label: section.label };

        if (is2Level) {
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
        } else { // 3-level
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