function renderSections() {
    const container = document.getElementById("section-container");
    let html = "";
    sectionsData.forEach((section, i) => {
        html += `
            <section class="mb-3 border-bottom" data-section="${i}">
                <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                    ${section.label}
                    <i class="bi bi-chevron-down"></i>
                </h2>
                <div class="section-content" style="display:none"></div>
            </section>
        `;
    });
    container.innerHTML = html;
}

function renderSection(section, isFiltered = false) {
    let html = "";
    if (section.items) {
        let rowOpen = false;
        section.items.forEach((sub, i) => {
            if (isFiltered && sub.items.length === 0) return;
            if (!rowOpen || (!isFiltered && i % 4 === 0)) {
                if (rowOpen) html += `</div>`;
                html += `<div class="row g-4">`;
                rowOpen = true;
            }

            html += `<div class="col-12 col-md-6 col-lg-3">`;
            html += `<h3 class="h6 mb-2 subcategory-title">${sub.label}</h3>`;
            html += renderSectionLinks(sub.items, isFiltered ? -1 : section.index, isFiltered ? -1 : i);
            html += `</div>`;
        });
        if (rowOpen) html += `</div>`;
    } else if (section.links) {
        html += renderSectionLinks(section.links, -1, -1);
    }
    return html;
}

function renderSectionLinks(links, sectionIndex, subIndex) {
    let html = `<ul class="list-unstyled mb-0">`;
    links.forEach((l, i) => {
        const dataS = sectionIndex >= 0 ? `data-s="${sectionIndex}"` : '';
        const dataC = subIndex >= 0 ? `data-c="${subIndex}"` : '';
        const dataI = i >= 0 ? `data-i="${i}"` : '';
        const dataName = `data-name="${l.name.replace(/"/g, '&quot;')}"`;
        html += `<li><a href="#" ${dataS} ${dataC} ${dataI} ${dataName}>${l.name}</a></li>`;
    });
    html += `</ul>`;
    return html;
}

function filterSections(query) {
    const normalize = q => q.toLowerCase().trim();
    const match = (item, q) => item.name && item.name.toLowerCase().includes(q);

    const filterSub = (sub, q) => ({
        label: sub.label,
        items: sub.items.filter(item => match(item, q))
    });

    const hasResults = s =>
        (s.items && s.items.length) || (s.links && s.links.length);

    const wrapSection = (label, content) => `
        <section class="mb-3 border-bottom open">
            <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                ${label}
                <i class="bi bi-chevron-down"></i>
            </h2>
            <div class="section-content" style="display:block">
                ${content}
            </div>
        </section>
    `;

    const q = normalize(query);
    const container = document.getElementById("section-container");

    if (!q) {
        filteredSectionsData = null;
        renderSections();
        return;
    }

    filteredSectionsData = sectionsData
        .map(section => {
            const filtered = { label: section.label };
            if (section.items) {
                filtered.items = section.items
                    .map(sub => filterSub(sub, q))
                    .filter(sub => sub.items.length);
            }
            if (section.links) {
                filtered.links = section.links.filter(item => match(item, q));
            }
            return hasResults(filtered) ? filtered : null;
        })
        .filter(Boolean);

    const html = filteredSectionsData.map(section => {
        let content = "";
        if (section.items) {
            content = renderSection(section, true);
        } else if (section.links) {
            content = renderSectionLinks(section.links, -1, -1);
        }
        return content ? wrapSection(section.label, content) : "";
    }).join("");

    container.innerHTML = html || `<p class="text-muted">No results found.</p>`;
}