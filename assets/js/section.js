const sectionsData = [
    bankData,
    insuranceData,
    healthcareData,
    realEstateData,
    foodAndDrinksData,
    wineEstateData,
    museumData
];

let sortOnSectionNames = true;

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

function getSortConfig(node, parent = {}) {
    return {
        sortOnSubsectionNames: node.sortOnSubsectionNames ?? parent.sortOnSubsectionNames ?? true,
        sortOnColumnNames: node.sortOnColumnNames ?? parent.sortOnColumnNames ?? true
    };
}

function hasRenderableItems(node) {
    if (!node) return false;
    if (isType(node, "data") || isType(node, "extra-data")) return true;
    if (!Array.isArray(node.items) || node.items.length === 0) return false;
    return node.items.some(hasRenderableItems);
}

function renderCategories(items = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("content-container");

    if (!Array.isArray(items) || !items.length) {
        const filterValue = document.getElementById("filter-id")?.value || '';
        container.innerHTML = `<p class="text-muted">
            <i class="bi bi-exclamation-square"></i>
            No results found for filter '${filterValue}'.
        </p>`;
        return;
    }

    const sortedSections = sortOnSectionNames
        ? [...items].sort(sortByField("name"))
        : [...items];

    container.innerHTML = sortedSections
        .map((item, i) =>
            renderNode(item, {
                level: 1,
                index: i,
                open,
                filtered,
                sortConfig: {}
            })
        )
        .join("");
}

function renderNode(node, ctx = {}) {
    if (!node || !hasRenderableItems(node)) return '';

    const currentSortConfig = getSortConfig(node, ctx.sortConfig);

    const nextCtx = {
        ...ctx,
        sortConfig: currentSortConfig
    };

    switch (node.type) {
        case "section":
            return renderSection(node, nextCtx, ctx);
        case "subsection":
            return renderSubsection(node, nextCtx);
        case "column":
            return renderColumn(node, nextCtx);
        case "data":
            return renderDataItem(node);
        default:
            return '';
    }
}

function renderSection(node, nextCtx, ctx) {
    return `
    <section class="mb-3 border-bottom ${ctx.filtered ? 'filtered' : ''}" data-section="${ctx.index}">
        <h2 class="h5 mb-3 d-flex justify-content-between align-items-center section-title-icon">
            <span class="section-title">
                ${node.name}
                ${ctx.filtered ? `<span class="filtered-icon"><i class="bi bi-funnel"></i></span>` : ''}
            </span>
            ${ctx.filtered ? '' : '<i class="bi bi-chevron-down chevron-icon"></i>'}
        </h2>

        <div class="section-content" style="display:${ctx.open ? 'block' : 'none'}">
            ${ctx.filtered
                ? renderFilteredEntries(node)
                : renderChildren(node, nextCtx)}
        </div>
    </section>`;
}

function renderSubsection(node, nextCtx) {
    return `
    <section class="subsection mb-2">
        <h3 class="h6 d-flex justify-content-between align-items-center subsection-header">
            <span>${node.name}</span>
            <i class="bi bi-chevron-down chevron-icon"></i>
        </h3>
        <div class="subsection-content" style="display:none;">
            ${renderChildren(node, nextCtx)}
        </div>
    </section>`;
}

function renderColumn(node, nextCtx) {
    return `
    <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100">
            <div class="card-body">
                <h3 class="h6 mb-3">${node.name}</h3>
                ${renderChildren(node, { ...nextCtx, forceColumn: true })}
            </div>
        </div>
    </div>`;
}

function renderChildren(node, ctx) {
    const items = node.items || [];
    if (!items.length) return '';

    const { sortConfig = {} } = ctx;

    let sorted = [...items];

    const firstType = items[0]?.type;

    if (firstType === "subsection" && sortConfig.sortOnSubsectionNames) {
        sorted.sort(sortByField("name"));
    }

    if (firstType === "column" && sortConfig.sortOnColumnNames) {
        sorted.sort(sortByField("name"));
    }

    if (firstType === "column") {
        const cols = sorted
            .filter(i => isType(i, "column"))
            .map((child, i) => renderNode(child, { ...ctx, index: i }))
            .join("");

        return `<div class="row">${cols}</div>`;
    }

    if (firstType === "subsection") {
        return sorted
            .filter(i => isType(i, "subsection"))
            .map((child, i) => renderNode(child, { ...ctx, index: i }))
            .join("");
    }

    if (firstType === "data") {
        const dataItems = sorted
            .filter(i => isType(i, "data"))
            .sort(sortByField("name"));

        const list = `
            <ul class="list-unstyled mb-0">
                ${dataItems.map(renderDataItem).join("")}
            </ul>
        `;

        if (ctx.forceColumn) return list;

        return `
        <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100">
                    <div class="card-body">
                        ${list}
                    </div>
                </div>
            </div>
        </div>`;
    }

    return '';
}

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

function renderFilteredEntries(section) {
    if (!section.items?.length) return '<p class="text-muted">No data found.</p>';

    const uniqueItems = [...new Map(
        section.items.map(item => [item.name, item])
    ).values()].sort(sortByField("name"));

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

function matchesFilterQuery(item, q) {
    return item.name?.toLowerCase().includes(q) ||
           item.mode?.toLowerCase().includes(q);
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