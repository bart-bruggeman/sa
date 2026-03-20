const sectionsData = [healthcareData, realEstateData, wineEstateData];
let filteredSectionsData = null;

function renderSections(data = sectionsData, open = false, filtered = false) {
    const contentContainer = document.getElementById("content-container");
    if (!Array.isArray(data) || !data.length) {
        const filterElement = document.getElementById("filter-id");
        const filterValue = filterElement?.value || '';
        contentContainer.innerHTML = `<p class="text-muted"><i class="bi bi-exclamation-square"></i> No results found for filter '${filterValue}'.</p>`;
        return;
    }
    const sortedData = sortSectionsData(data);
    contentContainer.innerHTML = sortedData.map((section, i) => renderSection(section, i, open, filtered)).join("");

    function sortSectionsData(data = []) {
        return data.map(section => ({
            ...section,
            items: sortLevel(section.items, hasOnlyLevel2Items(section))
        }));

        function sortLevel(levelItems = [], isLevel2Only = false) {
            if (!Array.isArray(levelItems)) return [];
            const sorted = [...levelItems].sort((a, b) => 
                (a.label || a.name || '').localeCompare(b.label || b.name || '')
            );
            if (isLevel2Only) {
                return sorted.map(item => ({
                    ...item,
                    items: item.items
                        ? [...item.items].sort((a, b) =>
                            (a.name || '').localeCompare(b.name || '')
                        )
                        : []
                }));
            }
            return sorted.map(level2 => ({
                ...level2,
                items: sortLevel(level2.items, true)
            }));
        }
    }

    function renderSection(section, index, open, filtered) {
        const content = filtered 
            ? renderFilteredItems(section)
            : hasOnlyLevel2Items(section)
                ? renderItemsLevel2(section.items) 
                : renderItemsLevel3(section.items);
        return `
        <section class="mb-3 border-bottom ${filtered ? 'filtered' : ''}" data-section="${index}">
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
        const filteredItems = items.filter(level2 => level2.items && level2.items.length);
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
        return wrapRow ? `<div class="row">${content}</div>` : content;

        function renderLinks(items = []) {
            if (!items.length) return '';
            return `<ul class="list-unstyled mb-0">
                ${items.map(item => `<li><a href="#" data-name="${item.name}">${item.name}</a></li>`).join("")}
            </ul>`;
        }
    }

    function renderItemsLevel3(level2Items = []) {
        const filteredLevel2 = level2Items.filter(level2 =>
            level2.items?.some(level3 => level3.items && level3.items.length)
        );
        if (!filteredLevel2.length) return '';
        return filteredLevel2.map(level2 => `
            <div class="mb-4 p-3 section-box rounded">
                <h4 class="h6 mb-3">${level2.label}</h4>
                ${renderItemsLevel2(level2.items, true)}
            </div>
        `).join("");
    }
}

function renderFilteredSections(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderSections(sectionsData, false, false);
        return;
    }
    const filteredData = sectionsData.map(section => {
        const matchedItems = [];
        if (hasOnlyLevel2Items(section)) { // level 1 + level 2 section type
            section.items?.forEach(level1 => {
                level1.items?.forEach(level2 => {
                    if (level2.name && level2.name.toLowerCase().includes(q)) {
                        matchedItems.push(level2);
                    }
                });
            });
        } else { // Level1 + Level2 + Level3 section type
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
    return !section.items?.some(level2 =>
        Array.isArray(level2.items) &&
        level2.items.some(level3 => level3.label && Array.isArray(level3.items))
    );
}