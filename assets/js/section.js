function renderSections(data = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("section-container");
    if (!Array.isArray(data) || !data.length) {
        container.innerHTML = `<p class="text-muted">No results found.</p>`;
        return;
    }
    container.innerHTML = data.map((section, i) => `
        <section class="mb-3 border-bottom ${open ? 'open' : ''}" data-section="${i}">
            <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                <span class="section-title-with-badge">
                    ${section.label}
                    ${filtered ? '<span class="badge text-bg-warning ms-1 align-text-top">filtered data</span>' : ''}
                </span>
                <i class="bi bi-chevron-down"></i>
            </h2>
            <div class="section-content" style="display:${open ? 'block' : 'none'}" data-loaded="true">
                ${renderSection(section)}
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
    const filteredSectionsData = sectionsData.map(section => {
        const result = { label: section.label };
        if (section.items) {
            result.items = section.items
                .map(sub => ({
                    label: sub.label,
                    items: sub.items.filter(i => i.name.toLowerCase().includes(q))
                }))
                .filter(sub => sub.items.length);
        }
        if (section.links) {
            result.links = section.links.filter(i => i.name.toLowerCase().includes(q));
        }
        return (result.items?.length || result.links?.length) ? result : null;
    }).filter(Boolean);
    renderSections(filteredSectionsData, true, true);
}

function renderSection(section) {
    if (section.items) {
        return `
            <div class="row g-4">
                ${section.items.map(sub => `
                    <div class="col-12 col-md-6 col-lg-3">
                        <h3 class="h6 mb-2 subcategory-title">${sub.label}</h3>
                        ${renderLinks(sub.items)}
                    </div>
                `).join("")}
            </div>
        `;
    }
    if (section.links) {
        return renderLinks(section.links);
    }
    return "";
}

function renderLinks(links) {
    return `
        <ul class="list-unstyled mb-0">
            ${links.map((l,i)=>`
                <li>
                    <a href="#" data-name="${l.name}">
                        ${l.name}
                    </a>
                </li>
            `).join("")}
        </ul>
    `;
}
