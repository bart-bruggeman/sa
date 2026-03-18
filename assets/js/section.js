function renderSections(data = sectionsData, open = false, filtered = false) {
    const contentContainer = document.getElementById("content-container");
    if (!Array.isArray(data) || !data.length) {
        contentContainer.innerHTML = `<p class="text-muted"><i class="bi bi-exclamation-square"></i> No results found.</p>`;
        return;
    }
    contentContainer.innerHTML = data.map((section, i) => renderSection(section, i, open, filtered)).join("");

    function renderSection(section, index, open, filtered) {
        const content = hasOnlyLevel2Items(section)
            ? renderItemsLevel2(section.items) 
            : renderItemsLevel3(section.items);
        if (!content) return '';
        return `
            <section class="mb-3 border-bottom ${open ? 'open' : ''}" data-section="${index}">
                <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                    <span class="section-title-with-filter-icon">
                        ${section.label}
                        ${filtered ? `<span class="filtered-icon"><i class="bi bi-funnel"></i></span>` : ''}
                    </span>
                    <i class="bi bi-chevron-down chevron-icon"></i>
                </h2>
                <div class="section-content" style="display:${open ? 'block' : 'none'}" data-loaded="true">
                    ${content}
                </div>
            </section>
        `;

        function renderItemsLevel2(items = [], wrapRow = true) {
            const filteredItems = items.filter(level2 => level2.items && level2.items.length);
            if (!filteredItems.length) return '';
            const content = filteredItems.map(level2 => `
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <h3 class="h6 mb-3">${level2.label}</h3>
                            ${renderLinks(level2.items)}
                        </div>
                    </div>
                </div>
            `).join("");
            return wrapRow ? `<div class="row g-4">${content}</div>` : content;

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
            const sectionHasonlyLevel2Items = hasOnlyLevel2Items(section);
            const result = { label: section.label };
            if (sectionHasonlyLevel2Items) {
                if (section.items) {
                    result.items = section.items
                        .map(level2 => ({
                            label: level2.label,
                            items: level2.items.filter(i => i.name.toLowerCase().includes(q))
                        }))
                        .filter(level2 => level2.items.length);
                }
                if (section.links) {
                    result.links = section.links.filter(l => l.name.toLowerCase().includes(q));
                }
            } else {
                if (section.items) {
                    result.items = section.items
                        .map(level2 => {
                            const newLevel2 = { label: level2.label };
                            if (level2.items) {
                                newLevel2.items = level2.items
                                    .map(level3 => ({
                                        label: level3.label,
                                        items: level3.items?.filter(i => i.name.toLowerCase().includes(q)) ?? []
                                    }))
                                    .filter(level3 => level3.items.length);
                            }
                            return newLevel2.items?.length ? newLevel2 : null;
                        })
                        .filter(Boolean);
                }
            }
            return (result.items?.length || result.links?.length) ? result : null;
        }).filter(Boolean);
    }
}

function hasOnlyLevel2Items(section) {
    return !section.items?.some(level2 =>
        Array.isArray(level2.items) &&
        level2.items.some(level3 => level3.label && Array.isArray(level3.items))
    );
}