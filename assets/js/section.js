const sectionsData = [healthcareData, realEstateData, wineEstateData];
let filteredSectionsData = null;

function renderSections(data = sectionsData, open = false, filtered = false) {
    const container = document.getElementById("content-container");

    container.innerHTML = data.map((section, i) => {
        const content = hasOnlyLevel2Items(section)
            ? renderItemsLevel2(section.items)
            : renderItemsLevel3(section.items);
        return `
        <section class="mb-3 border-bottom">
            <h2 class="h5 d-flex justify-content-between align-items-center">
                ${section.label}
                <i class="bi bi-chevron-down chevron-icon"></i>
            </h2>
            <div class="section-content" style="display:${open ? 'block' : 'none'}">
                ${content}
            </div>
        </section>`;
    }).join("");
}

function renderItemsLevel2(items = [], wrapRow = true) {
    if (!Array.isArray(items)) return '';
    const content = items.map(item => `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <h3 class="h6">${item.label || ''}</h3>
                    <ul>
                        ${(item.items || []).map(i => `
                            <li><a href="#">${i.name}</a></li>
                        `).join("")}
                    </ul>
                </div>
            </div>
        </div>
    `).join("");
    return wrapRow ? `<div class="row">${content}</div>` : content;
}

function renderItemsLevel3(level2Items = []) {
    const tabsId = `tabs-${Date.now()}`;
    const MAX = 2;
    const visible = level2Items.slice(0, MAX);
    const dropdown = level2Items.slice(MAX);
    const nav = `
    <ul class="nav nav-tabs mb-3">
        ${visible.map((l, i) => `
            <li class="nav-item">
                <button class="nav-link ${i === 0 ? 'active' : ''}"
                    data-bs-toggle="tab"
                    data-bs-target="#${tabsId}-${i}"
                    type="button">
                    ${l.label}
                </button>
            </li>
        `).join("")}
        ${dropdown.length ? `
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button">
                Other...
            </button>
            <ul class="dropdown-menu">
                ${dropdown.map((l, i) => `
                    <li>
                        <button class="dropdown-item"
                            data-bs-toggle="tab"
                            data-bs-target="#${tabsId}-${i + MAX}"
                            type="button">
                            ${l.label}
                        </button>
                    </li>
                `).join("")}
            </ul>
        </li>` : ''}
    </ul>`;

    const content = `
    <div class="tab-content">
        ${level2Items.map((l, i) => `
            <div class="tab-pane fade ${i === 0 ? 'show active' : ''}"
                id="${tabsId}-${i}">
                <div class="row">
                    ${renderItemsLevel2(l.items, false)}
                </div>
            </div>
        `).join("")}
    </div>`;
    return nav + content;
}

function hasOnlyLevel2Items(section) {
    return !section.items?.some(i => i.items?.[0]?.items);
}

function initSectionEvents() {
    document.getElementById("content-container").addEventListener("click", (e) => {
        if (
            e.target.closest('[data-bs-toggle="tab"]') ||
            e.target.closest('.dropdown-menu') ||
            e.target.closest('.dropdown-toggle')
        ) return;
        const section = e.target.closest("section");
        if (!section) return;
        const content = section.querySelector(".section-content");
        const isOpen = section.classList.contains("open");
        document.querySelectorAll("section").forEach(s => {
            s.classList.remove("open");
            const c = s.querySelector(".section-content");
            if (c) c.style.display = "none";
        });
        if (!isOpen) {
            section.classList.add("open");
            content.style.display = "block";
        }
    });
}