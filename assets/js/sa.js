//-------------------------------- CONFIG --------------------------------//

const DEFAULT_ICON = "bi-dot";

const fieldConfig = {
    address: {
        icon: "bi-geo-alt",
        render: v => `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    coordinates: {
        icon: "bi-geo",
        render: v => `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    email: {
        icon: "bi-envelope",
        render: v => `<a href="mailto:${v}">${v}</a>`
    },
    phone: {
        icon: "bi-telephone",
        render: v => `<a href="tel:${v.replace(/\s+/g, '')}">${v}</a>`
    },
    phone_emergency: {
        icon: "bi-telephone-plus-fill",
        colorClass: "emergency",
        render: v => `<a href="tel:${v.replace(/\s+/g, '')}" class="emergency">${v}</a>`
    },
    url: {
        icon: "bi-globe",
        render: v => `<a href="${v}" target="_blank">${v}</a>`
    },
    hours: {
        icon: "bi-clock",
        render: v => v
    },
    info: {
        icon: "bi-info-circle",
        render: v => v
    }
};

const sectionsData = [healthcareData, realEstateData, wineEstateData];

// Variable to hold filtered data when searching
let filteredSectionsData = null;

//-------------------------------- FIELD HTML --------------------------------//

function renderFields(data) {
    let html = "";
    for (const [key, val] of Object.entries(data)) {
        if (!val || key === "name" || key === "items") continue;
        const cfg = fieldConfig[key] || { icon: DEFAULT_ICON, render: v => v };
        const color = cfg.colorClass || "";
        html += `<p><span class="value ${color}"><i class="bi ${cfg.icon} icon ${color}"></i>${cfg.render(val)}</span></p>`;
    }
    return html;
}

//-------------------------------- OFFICE BLOCK --------------------------------//

function officeBlockHTML(office, showName = true) {
    let html = `<div class="office-block mb-4">`;
    if (showName && office.name) {
        html += `<p><strong>${office.name}</strong></p><hr>`;
    }
    html += renderFields(office);
    html += `</div>`;
    return html;
}

//-------------------------------- OFFCANVAS --------------------------------//

function renderOffcanvas(link) {
    const pane = document.getElementById("linkPane");
    const body = pane.querySelector(".offcanvas-body");
    let html = `<div class="office-top mb-3"><p><strong>${link.name}</strong></p><hr></div>`;
    html += officeBlockHTML(link, false);
    if (link.items) {
        link.items.forEach(branch => {
            html += officeBlockHTML(branch, true);
        });
    }
    body.innerHTML = html;
    bootstrap.Offcanvas.getOrCreateInstance(pane).show();
}

//-------------------------------- LINKS --------------------------------//

function linkListHTML(links, sectionIndex, subIndex) {
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

//-------------------------------- SUBCATEGORY RENDER --------------------------------//

function renderSubcategories(sectionIndex) {
    const section = sectionsData[sectionIndex];
    let html = "";
    if (section.items) {
        let rowOpen = false;
        section.items.forEach((sub, i) => {
            if (i % 4 === 0) {
                if (rowOpen) html += `</div>`;
                html += `<div class="row g-4">`;
                rowOpen = true;
            }
            html += `<div class="col-12 col-md-6 col-lg-3">`;
            html += `<h3 class="h6 mb-2 subcategory-title">${sub.label}</h3>`;
            html += linkListHTML(sub.items, sectionIndex, i);
            html += `</div>`;
        });
        if (rowOpen) html += `</div>`;
    } else if (section.links) {
        html += linkListHTML(section.links, sectionIndex, -1);
    }
    return html;
}

//-------------------------------- SUBCATEGORY RENDER FILTERED --------------------------------//

function renderSubcategoriesFiltered(filteredSection) {
    let html = "";
    if (filteredSection.items) {
        let rowOpen = false;
        filteredSection.items.forEach(sub => {
            if (sub.items.length === 0) return;
            if (!rowOpen) {
                html += `<div class="row g-4">`;
                rowOpen = true;
            }
            html += `<div class="col-12 col-md-6 col-lg-3">`;
            html += `<h3 class="h6 mb-2 subcategory-title">${sub.label}</h3>`;
            html += linkListHTML(sub.items, -1, -1);
            html += `</div>`;
        });
        if (rowOpen) html += `</div>`;
    } else if (filteredSection.links) {
        html += linkListHTML(filteredSection.links, -1, -1);
    }
    return html;
}

//-------------------------------- SECTIONS --------------------------------//

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

//-------------------------------- EVENTS --------------------------------//

function initEvents() {
    const container = document.getElementById("section-container");
    container.addEventListener("click", e => {
        // Links click
        const link = e.target.closest("a[data-name]");
        if (link) {
            e.preventDefault();
            const s = link.dataset.s;
            const c = link.dataset.c;
            const i = link.dataset.i;
            const name = link.dataset.name;
            let item;

            // Gebruik gefilterde data als aanwezig
            const dataSource = filteredSectionsData || sectionsData;

            if (s !== undefined && s !== '' && c !== undefined && c !== '' && i !== undefined && i !== '') {
                const section = dataSource[s];
                if (section) {
                    if (c >= 0 && section.items) {
                        item = section.items[c]?.items[i];
                    } else if (section.links) {
                        item = section.links[i];
                    }
                }
            }

            if (!item && name) {
                // fallback op naam zoeken in dataSource
                outer:
                for (const section of dataSource) {
                    if (section.items) {
                        for (const sub of section.items) {
                            const found = sub.items.find(it => it.name === name);
                            if (found) {
                                item = found;
                                break outer;
                            }
                        }
                    }
                    if (section.links) {
                        const found = section.links.find(it => it.name === name);
                        if (found) {
                            item = found;
                            break;
                        }
                    }
                }
            }

            if (item) {
                renderOffcanvas(item);
            }
            return;
        }

        // Sections toggle open/close
        const sectionEl = e.target.closest("section");
        if (!sectionEl || e.target.closest("a")) return;

        const isOpen = sectionEl.classList.contains("open");

        if (filteredSectionsData) {
            // Bij gefilterde data: alleen de aangeklikte sectie open/dicht houden
            if (isOpen) {
                sectionEl.classList.remove("open");
                const cont = sectionEl.querySelector(".section-content");
                if (cont) cont.style.display = "none";
            } else {
                sectionEl.classList.add("open");
                const idx = sectionEl.dataset.section;
                const content = sectionEl.querySelector(".section-content");
                if (idx !== undefined && idx !== null && idx !== '') {
                    if (!content.dataset.loaded) {
                        content.innerHTML = renderSubcategoriesFiltered(filteredSectionsData[idx]);
                        content.dataset.loaded = true;
                    }
                }
                if (content) content.style.display = "block";
            }
            return;
        }

        // Normale data: sluit alle behalve de aangeklikte sectie
        document.querySelectorAll("#section-container section").forEach(sec => {
            sec.classList.remove("open");
            const cont = sec.querySelector(".section-content");
            if (cont) cont.style.display = "none";
        });

        if (!isOpen) {
            sectionEl.classList.add("open");
            const idx = sectionEl.dataset.section;
            const content = sectionEl.querySelector(".section-content");
            if (!content.dataset.loaded) {
                content.innerHTML = renderSubcategories(idx);
                content.dataset.loaded = true;
            }
            content.style.display = "block";
        }
    });
}

//-------------------------------- THEME --------------------------------//

function initTheme() {
    const btn = document.getElementById("themeToggleLink");
    const html = document.documentElement;
    const icon = btn.querySelector("i");

    function setTheme(t) {
        html.dataset.bsTheme = t;
        localStorage.setItem("theme", t);
        icon.classList.toggle("bi-toggle-on", t === "dark");
        icon.classList.toggle("bi-toggle-off", t !== "dark");
    }

    setTheme(localStorage.getItem("theme") || "light");

    btn.addEventListener("click", e => {
        e.preventDefault();
        setTheme(html.dataset.bsTheme === "dark" ? "light" : "dark");
    });
}

//-------------------------------- INIT --------------------------------//

document.addEventListener("DOMContentLoaded", () => {
    renderSections();
    initEvents();
    initTheme();

    const search = document.getElementById("directory-search");

    if (search) {
        search.addEventListener("input", e => {
            searchDirectory(e.target.value);
        });
    }

    // Globale Escape handler
    document.addEventListener("keydown", e => {
        if (e.key !== "Escape") return;

        const pane = document.getElementById("linkPane");
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(pane);

        if (offcanvasInstance && pane.classList.contains("show")) {
            // 1️⃣ Right pane open → alleen sluiten
            offcanvasInstance.hide();
        } else {
            // 2️⃣ Pane gesloten → zoekveld en filter reset
            if (search) {
                search.value = "";
                filteredSectionsData = null;
                renderSections();
            }
        }
    });
});

//-------------------------------- SEARCH --------------------------------//

function searchDirectory(query) {
    const q = query.toLowerCase().trim();
    const container = document.getElementById("section-container");

    if (!q) {
        filteredSectionsData = null;
        renderSections();
        return;
    }

    filteredSectionsData = [];

    sectionsData.forEach(section => {
        let filteredSection = { label: section.label };

        if (section.items) {
            filteredSection.items = section.items.map(sub => {
                const matches = sub.items.filter(item =>
                    item.name && item.name.toLowerCase().includes(q)
                );
                return { label: sub.label, items: matches };
            }).filter(sub => sub.items.length > 0);
        }

        if (section.links) {
            filteredSection.links = section.links.filter(item =>
                item.name && item.name.toLowerCase().includes(q)
            );
        }

        // Alleen toevoegen als er resultaten zijn
        if ((filteredSection.items && filteredSection.items.length > 0) ||
            (filteredSection.links && filteredSection.links.length > 0)) {
            filteredSectionsData.push(filteredSection);
        }
    });

    let html = "";

    filteredSectionsData.forEach(section => {
        let sectionHTML = "";

        if (section.items) {
            sectionHTML += renderSubcategoriesFiltered(section);
        } else if (section.links) {
            sectionHTML += linkListHTML(section.links, -1, -1);
        }

        if (sectionHTML) {
            html += `
                <section class="mb-3 border-bottom open">
                    <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                        ${section.label}
                        <i class="bi bi-chevron-down"></i>
                    </h2>
                    <div class="section-content" style="display:block">
                        ${sectionHTML}
                    </div>
                </section>
            `;
        }
    });

    container.innerHTML = html || `<p class="text-muted">No results found.</p>`;
}