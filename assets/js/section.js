const sectionsData = [bankData, insuranceData, healthcareData, realEstateData, foodAndDrinksData, wineEstateData];

function isType(item, type) {
    return item?.type === type;
}

function byField(field) {
    return (a, b) => {
        const v1 = (a[field] || "").toLowerCase().trim();
        const v2 = (b[field] || "").toLowerCase().trim();
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    };
}

function renderSections(level_1_items = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("content-container");
    if (!Array.isArray(level_1_items) || !level_1_items.length) {
        const filterValue = document.getElementById("filter-id")?.value || '';
        container.innerHTML = `<p class="text-muted"><i class="bi bi-exclamation-square"></i> No results found for filter '${filterValue}'.</p>`;
        return;
    }

    container.innerHTML = level_1_items.map((section, i) => {
        const content = filtered
            ? filteredContentAsList(section)
            : hasSubsections(section)
                ? contentAsSectionWithSubsections(section.items)
                : contentAsSectionWithColumns(section.items);

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

function hasSubsections(section) {
    return section.items?.some(item => isType(item, "subsection"));
}

function contentAsSectionWithColumns(columns = [], wrapRow = true) {
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
                        ${renderColumnData(dataItems)}
                    </div>
                </div>
            </div>
        `;
    }).join("");
    return wrapRow ? `<div class="row">${content}</div>` : content;
}

function contentAsSectionWithSubsections(items = []) {
    return (items || [])
        .filter(item => isType(item, "subsection"))
        .sort(byField("name"))
        .map((subsection, i) => `
            <section class="subsection mb-2" data-level2="${i}">
                <h3 class="h6 d-flex justify-content-between align-items-center subsection-header">
                    <span>${subsection.name}</span>
                    <i class="bi bi-chevron-down chevron-icon"></i>
                </h3>
                <div class="subsection-content" style="display:none;">
                    ${contentAsSectionWithColumns(subsection.items)}
                </div>
            </section>
        `).join("");
}

function renderColumnData(dataItems = []) {
    if (!dataItems.length) return '';
    return `<ul class="list-unstyled mb-0">
        ${dataItems
            .sort(byField("name"))
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

function filteredContentAsList(section) {
    if (!section.items?.length) return '<p class="text-muted">No data found.</p>';
    const uniqueItems = [...new Map(section.items.map(item => [item.name, item])).values()]
        .sort(byField("name"));
    return `<ul class="list-unstyled mb-2 filtered-list">
        ${uniqueItems.map(item => {
            const hotIcon = item.mode === 'hot' ? '<i class="bi bi-fire hot-icon ms-2"></i>' : '';
            return `<li><a href="#" data-name="${item.name}">${item.name}${hotIcon}</a></li>`;
        }).join('')}
    </ul>`;
}

function getAllExtraData(items = []) {
    let result = [];
    items.forEach(item => {
        if (isType(item, "extra-data") || isType(item, "data")) {
            result.push(item);
        }
        if (item.items?.length) {
            result = result.concat(getAllExtraData(item.items));
        }
    });
    return result;
}

function renderFilteredSections(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderSections(sectionsData, false, false);
        return;
    }
    const filteredData = sectionsData
        .map(section => {
            const matches = getAllExtraData(section.items)
                .filter(item => matchesQuery(item, q));

            return matches.length
                ? { name: section.name, items: matches }
                : null;
        })
        .filter(Boolean);
    renderSections(filteredData, true, true);
}

function matchesQuery(item, q) {
    return item.name?.toLowerCase().includes(q) ||
           item.mode?.toLowerCase().includes(q);
}