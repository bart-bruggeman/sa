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

/* =========================
   ROOT
========================= */

function renderCategories(items = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("content-container");

    if (!Array.isArray(items) || !items.length) {
        const filterValue = document.getElementById("filter-id")?.value || '';
        container.innerHTML = `<p class="text-muted"><i class="bi bi-exclamation-square"></i> No results found for filter '${filterValue}'.</p>`;
        return;
    }

    container.innerHTML = items.map((item, i) =>
        renderNode(item, { level: 1, index: i, open, filtered })
    ).join("");
}

/* =========================
   CORE RENDERER (🔥)
========================= */

function renderNode(node, ctx = {}) {
    const { level = 1, index = 0, open = false, filtered = false } = ctx;

    if (!node) return '';

    switch (node.type) {

        case "section":
            return `
            <section class="mb-3 border-bottom ${filtered ? 'filtered' : ''}" data-section="${index}">
                <h2 class="h5 mb-3 d-flex justify-content-between align-items-center section-title-icon">
                    <span class="section-title">
                        ${node.name}
                        ${filtered ? `<span class="filtered-icon"><i class="bi bi-funnel"></i></span>` : ''}
                    </span>
                    ${filtered ? '' : '<i class="bi bi-chevron-down chevron-icon"></i>'}
                </h2>
                <div class="section-content" style="display:${open ? 'block' : 'none'}">
                    ${filtered
                        ? renderFilteredEntries(node)
                        : renderChildren(node, ctx)}
                </div>
            </section>
            `;

        case "subsection":
            return `
            <section class="subsection mb-2" data-level2="${index}">
                <h3 class="h6 d-flex justify-content-between align-items-center subsection-header">
                    <span>${node.name}</span>
                    <i class="bi bi-chevron-down chevron-icon"></i>
                </h3>
                <div class="subsection-content" style="display:none;">
                    ${renderChildren(node, ctx)}
                </div>
            </section>
            `;

        case "column":
            return `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="h6 mb-3">${node.name}</h3>
                        ${renderChildren(node, ctx)}
                    </div>
                </div>
            </div>
            `;

        case "data":
            return renderDataItem(node);

        default:
            return '';
    }
}

/* =========================
   CHILD RENDERING
========================= */

function renderChildren(node, ctx) {
    if (!node.items?.length) return '';

    const items = [...node.items].sort(sortByField("name"));

    // subsection children → render directly
    if (items.some(i => isType(i, "subsection"))) {
        return items
            .filter(i => isType(i, "subsection"))
            .map((child, i) => renderNode(child, { ...ctx, index: i }))
            .join("");
    }

    // column children → wrap in row
    if (items.some(i => isType(i, "column"))) {
        const cols = items
            .filter(i => isType(i, "column"))
            .map((child, i) => renderNode(child, { ...ctx, index: i }))
            .join("");
        return `<div class="row">${cols}</div>`;
    }

    // data children → render as list
    if (items.some(i => isType(i, "data"))) {
        return `
        <ul class="list-unstyled mb-0">
            ${items
                .filter(i => isType(i, "data"))
                .map(renderDataItem)
                .join("")}
        </ul>
        `;
    }

    return '';
}

/* =========================
   DATA ITEM
========================= */

function renderDataItem(item) {
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
}

/* =========================
   FILTERING (blijft grotendeels gelijk)
========================= */

function renderFilteredEntries(section) {
    if (!section.items?.length) return '<p class="text-muted">No data found.</p>';

    const uniqueItems = [...new Map(section.items.map(item => [item.name, item])).values()]
        .sort(sortByField("name"));

    return `
    <ul class="list-unstyled mb-2 filtered-list">
        ${uniqueItems.map(renderDataItem).join('')}
    </ul>
    `;
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
                ? { type: "section", name: section.name, items: matches }
                : null;
        })
        .filter(Boolean);

    renderCategories(filteredData, true, true);
}

function matchesFilterQuery(item, q) {
    return item.name?.toLowerCase().includes(q) ||
           item.mode?.toLowerCase().includes(q);
}