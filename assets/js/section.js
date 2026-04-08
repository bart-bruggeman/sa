const sectionsData = [bankData, insuranceData, healthcareData, realEstateData, wineEstateData];

function renderSections(level_1_items = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("content-container");
    if (!Array.isArray(level_1_items) || !level_1_items.length) {
        const filterElement = document.getElementById("filter-id");
        const filterValue = filterElement?.value || '';
        container.innerHTML = `<p class="text-muted"><i class="bi bi-exclamation-square"></i> No results found for filter '${filterValue}'.</p>`;
        return;
    }
    container.innerHTML = level_1_items.map((level_1_item, i) => {
        const content = filtered
            ? filteredContentAsList(level_1_item)
            : hasOnlyLevel2Items(level_1_item)
                ? contentAsSectionWithThreeColumnCards(level_1_item.items)
                : contentAsSectionWithSubsectionWithThreeColumnCards(level_1_item.items);
        return `
        <section class="mb-3 border-bottom ${filtered ? 'filtered' : ''}" data-section="${i}">
            <h2 class="h5 mb-3 d-flex justify-content-between align-items-center section-title-icon">
                <span class="section-title">
                    ${level_1_item.label}
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

    function filteredContentAsList(level_1_item) {
        if (!level_1_item.items?.length) return '<p class="text-muted">No data found.</p>';
        const uniqueItems = Array.from(new Map(level_1_item.items.map(level_2_item => [level_2_item.label, level_2_item])).values());
        const sortedItems = uniqueItems.sort(byField("label"));
        return `<ul class="list-unstyled mb-2 filtered-list">
            ${sortedItems.map(item => {
                const hotIcon = item.mode === 'hot' ? '<i class="bi bi-fire hot-icon ms-2"></i>' : '';
                return `<li><a href="#" data-label="${item.label}">${item.label}${hotIcon}</a></li>`;
            }).join('')}
        </ul>`;
    }

    function contentAsSectionWithThreeColumnCards(level_2_items = [], wrapRow = true) {
        const level2Items = (level_2_items || []).filter(level_2_item => level_2_item.items && level_2_item.items.length);
        if (!level2Items.length) return '';
        const sortedLevel2Items = level2Items.sort(byField("label"));
        const content = sortedLevel2Items.map(level_2_item => `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="h6 mb-3">${level_2_item.label}</h3>
                        ${renderLinks(level_2_item.items)}
                    </div>
                </div>
            </div>
        `).join("");

        function renderLinks(level_2_items = []) {
            if (!level_2_items.length) return '';
            const sortedLevel2Items = level_2_items.sort(byField("label"));
            return `<ul class="list-unstyled mb-0">
                ${sortedLevel2Items.map(level_2_item => {
                    const hotIcon = level_2_item.mode === 'hot' ? '<i class="bi bi-fire hot-icon ms-2"></i>' : '';
                    return `<li>
                                <a href="#" data-label="${level_2_item.label}">${level_2_item.label}${hotIcon}</a>
                            </li>`;
                }).join("")}
            </ul>`;
        }

        return wrapRow ? `<div class="row">${content}</div>` : content;
    }

    function contentAsSectionWithSubsectionWithThreeColumnCards(level_2_items = []) {
        const sortedLevel2Items = level_2_items.sort(byField("label"));
        return sortedLevel2Items.map((level_2_item, i) => `
            <section class="subsection mb-2" data-level2="${i}">
                <h3 class="h6 d-flex justify-content-between align-items-center subsection-header">
                    <span>${level_2_item.label}</span>
                    <i class="bi bi-chevron-down chevron-icon"></i>
                </h3>
                <div class="subsection-content" style="display:none;">
                    ${contentAsSectionWithThreeColumnCards(level_2_item.items, true)}
                </div>
            </section>
        `).join("");
    }
}

function renderFilteredSections(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderSections(sectionsData, false, false);
        return;
    }
    const filteredData = sectionsData.map(level_1_item => {
        const matchedItems = [];
        if (hasOnlyLevel2Items(level_1_item)) {
            level_1_item.items?.forEach(level_2_item => {
                level_2_item.items?.forEach(level_3_item => {
                    if (matchesQuery(level_3_item, q)) {
                        matchedItems.push(level_3_item);
                    }
                });
            });
        } else {
            level_1_item.items?.forEach(level_2_item => {
                level_2_item.items?.forEach(level_3_item => {
                    level_3_item.items?.forEach(level_4_item => {
                        if (matchesQuery(level_4_item, q)) {
                            matchedItems.push(level_4_item);
                        }
                    });
                });
            });
        }
        return matchedItems.length ? { label: level_1_item.label, items: matchedItems } : null;
    }).filter(Boolean);

    function matchesQuery(item, q) {
        return item.label?.toLowerCase().includes(q)
            || item.mode?.toLowerCase().includes(q);
    }

    renderSections(filteredData, true, true);
}

function hasOnlyLevel2Items(level_1_item) {
    return !level_1_item.items?.some(level_2_item =>
        Array.isArray(level_2_item.items) && level_2_item.items.some(level_3_item =>
            isPureContainer(level_3_item)
        )
    );

    function isPureContainer(item) {
        const keys = Object.keys(item);
        return keys.length === 2 && keys.includes("label") && keys.includes("items");
    }
}

function byField(field) {
    return (a, b) => {
        const v1 = (a[field] || "").toLowerCase().trim();
        const v2 = (b[field] || "").toLowerCase().trim();
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
    };
}