const sectionsData = [bankData, insuranceData, healthcareData, realEstateData, foodAndDrinksData, wineEstateData];

function isType(item, type) {
    return item?.type === type;
}

function sortByField(field) {
    return (a, b) => {
        const v1 = (a[field] || "").toLowerCase().trim();
        const v2 = (b[field] || "").toLowerCase().trim();
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    };
}

function renderCategories(level_1_items = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("content-container");
    if (!Array.isArray(level_1_items) || !level_1_items.length) {
        const filterValue = document.getElementById("filter-id")?.value || '';
        container.innerHTML = `<p class="text-muted"><i class="bi bi-exclamation-square"></i> No results found for filter '${filterValue}'.</p>`;
        return;
    }

    container.innerHTML = level_1_items.map((section, i) => {
        const content = filtered
            ? renderFilteredEntries(section)
            : hasGroups(section)
                ? renderCategoryGroups(section.items)
                : renderCategoryPanels(section.items);

        return `
        <section class="mb-3 border-bottom ${filtered ? 'filtered' : ''}" data-section="${i}">
            <h2 class="h5 mb-3 d-flex justify-content-between align-items-center section-title-icon">
                <span class="section-title">
                    ${section.name}
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

function hasGroups(section) {
    return section.items?.some(item => isType(item, "subsection"));
}

function renderCategoryPanels(columns = [], wrapRow = true) {
    const validColumns = (columns || [])
        .filter(col => isType(col, "column"));
    if (!validColumns.length) return '';
    const content = validColumns.map(column => {
        const dataItems = (column.items || [])
            .filter(item => isType(item, "data"));
        return `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="h6 mb-3">${column.name}</h3>
                        ${renderPanelEntries(dataItems)}
                    </div>
                </div>
            </div>
        `;
    }).join("");
    return wrapRow ? `<div class="row">${content}</div>` : content;
}

function renderCategoryGroups(items = []) {
    return (items || [])
        .filter(item => isType(item, "subsection"))
        .sort(sortByField("name"))
        .map((subsection, i) => `
            <section class="subsection mb-2" data-level2="${i}">
                <h3 class="h6 d-flex justify-content-between align-items-center subsection-header">
                    <span>${subsection.name}</span>
                    <i class="bi bi-chevron-down chevron-icon"></i>
                </h3>
                <div class="subsection-content" style="display:none;">
                    ${renderCategoryPanels(subsection.items)}
                </div>
            </section>
        `).join("");
}

function renderPanelEntries(dataItems = []) {
    if (!dataItems.length) return '';
    return `<ul class="list-unstyled mb-0">
        ${dataItems
            .sort(sortByField("name"))
            .map(item => {
                const hotIcon = item.mode === 'hot'
                    ? '<i class="bi bi-fire hot-icon ms-2"></i>'
                    : '';
                return `
                    <li>
                        <a href="#" data-name="${item.name}">
                            ${item.name}${hotIcon}
                        </a>
                    </li>
                `;
            }).join("")}
    </ul>`;
}

function renderFilteredEntries(section) {
    if (!section.items?.length) return '<p class="text-muted">No data found.</p>';
    const uniqueItems = [...new Map(section.items.map(item => [item.name, item])).values()]
        .sort(sortByField("name"));
    return `<ul class="list-unstyled mb-2 filtered-list">
        ${uniqueItems.map(item => {
            const hotIcon = item.mode === 'hot' ? '<i class="bi bi-fire hot-icon ms-2"></i>' : '';
            return `<li><a href="#" data-name="${item.name}">${item.name}${hotIcon}</a></li>`;
        }).join('')}
    </ul>`;
}

function collectEntrieDetails(items = []) {
    let result = [];
    items.forEach(item => {
        if (isType(item, "extra-data") || isType(item, "data")) {
            result.push(item);
        }
        if (item.items?.length) {
            result = result.concat(collectEntrieDetails(item.items));
        }
    });
    return result;
}

function renderFilteredCategories(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderCategories(sectionsData, false, false);
        return;
    }
    const filteredData = sectionsData
        .map(section => {
            const matches = collectEntrieDetails(section.items)
                .filter(item => matchesFilterQuery(item, q));

            return matches.length
                ? { name: section.name, items: matches }
                : null;
        })
        .filter(Boolean);
    renderCategories(filteredData, true, true);
}

function matchesFilterQuery(item, q) {
    return item.name?.toLowerCase().includes(q) ||
           item.mode?.toLowerCase().includes(q);
}