//-------------------------------- CONFIG -------------------------------//
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
        render: v => {
            const values = Array.isArray(v) ? v : [v];
            return values.map(v => `${v}`).join('<br>'); 
        }
    },
    info: {
        icon: "bi-info-circle",
        render: v => v
    }
};

const sectionsData = [healthcareData, realEstateData, wineEstateData];

let filteredSectionsData = null;

//-------------------------- INIT EVENTHANDLERS -------------------------//
document.addEventListener("DOMContentLoaded", eventListeners);

function eventListeners() {
    const search = document.getElementById("directory-search");
    const brand = document.querySelector(".navbar-brand");
    const offcanvasEl = document.getElementById("linkPane");
    const bsOffcanvas = offcanvasEl ? bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl) : null;

    renderFooter();
    renderSections();
    initSectionEvents();
    initTheme();

    if (search) search.addEventListener("input", e => filterSections(e.target.value));
    if (brand) brand.addEventListener("click", handleBrandClick);
    if (offcanvasEl) {
        offcanvasEl.addEventListener("shown.bs.offcanvas", () => toggleSearch(false));
        offcanvasEl.addEventListener("hidden.bs.offcanvas", () => toggleSearch(true));
    }
    document.addEventListener("keydown", handleEscapeOrClose);

    function handleBrandClick(e) {
        e.preventDefault();
        resetAndClose();
        renderSections();
        if (bsOffcanvas?._isShown) bsOffcanvas.hide();
    }

    function toggleSearch(enabled) {
        if (!search) return;
        search.disabled = !enabled;
        search.type = enabled ? "search" : "text";
    }

    function handleEscapeOrClose(e) {
        if (e.key !== "Escape") return;
        if (bsOffcanvas && offcanvasEl.classList.contains("show")) {
            bsOffcanvas.hide();
        } else {
            resetAndClose();
            renderSections();
        }
    }

    function resetAndClose() {
        if (!search) return;
        search.value = "";
        filteredSectionsData = null;
        document.querySelectorAll("#section-container section").forEach(sec => {
            sec.classList.remove("open");
            const content = sec.querySelector(".section-content");
            if (content) content.style.display = "none";
        });
    }
}

//------------------------------ RIGHT PANE -----------------------------//
function renderRightPane(link) {
    const pane = document.getElementById("linkPane");
    const body = pane.querySelector(".offcanvas-body");
    let html = `<div class="office-top mb-3"><p><strong>${link.name}</strong></p><hr></div>`;
    html += renderRightPaneBlock(link, false);
    if (link.items) {
        link.items.forEach(branch => {
            html += renderRightPaneBlock(branch, true);
        });
    }
    body.innerHTML = html;
    bootstrap.Offcanvas.getOrCreateInstance(pane).show();

    function renderRightPaneBlock(office, showName = true) {
        let html = `<div class="office-block mb-4">`;
        html += renderHeader(office, showName);
        html += renderData(office);
        html += `</div>`;
        return html;
    }

    function renderHeader(office, showName) {
        let html = "";
        if (showName && office.name) {
            html += `<p><strong>${office.name}</strong></p><hr>`;
        }
        return html;
    }
    
    function renderData(data) {
        let html = "";
        for (const [key, val] of Object.entries(data)) {
            if (!val || key === "name" || key === "items") continue;
            const cfg = fieldConfig[key] || { icon: DEFAULT_ICON, render: v => v };
            const color = cfg.colorClass || "";
            html += `<p><span class="value ${color}"><i class="bi ${cfg.icon} icon ${color}"></i>${cfg.render(val)}</span></p>`;
        }
        return html;
    }
}

//------------------------------- SECTIONS ------------------------------//
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

//---------------------------- FOOTER RENDER ----------------------------//
function renderFooter() {
    renderFooterEmergency();
    renderFooterGeography();

    function renderFooterEmergency() {
        const container = document.getElementById("emergencyPhones");
        if (!container) return;
        let html = '<div class="row">';
        emergencyData.forEach(group => {
            html += `<div class="col-md-3 col-6 mb-1">`;
            html += `<h5>${group.label}</h5>`;
            html += `<ul class="list-unstyled">`;
            group.items.forEach(item => {
                html += `<li>`;
                html += `<a href="tel:${item.phone.replace(/\s+/g,'')}" class="d-flex align-items-center link-footer emergency">`;
                html += `<i class="bi bi-telephone fs-5 me-1"></i>${item.phone}</a>`;
                if (item.comment) html += ` ${item.comment}`;
                html += `</li>`;
            });
            html += `</ul></div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }

    function renderFooterGeography() {
        const container = document.getElementById("footerGeography");
        if (!container) return;
        let html = `<div class="row">`;
        html += `<p>`;
        html += `Town/Place: ${geographicData.town} | `;
        html += `Region/Area: ${geographicData.region} | `;
        html += `City: ${geographicData.city} | `;
        html += `Province: ${geographicData.province}`;
        html += `</p>`;
        if (Array.isArray(geographicData.suburbs) && geographicData.suburbs.length > 0) {
            html += `<p>Suburbs: ${geographicData.suburbs.join(', ')}</p>`;
        }
        html += `</div>`;
        container.innerHTML = html;
    }

}

//-------------------------------- THEME --------------------------------//
function initTheme() {
    const btn = document.getElementById("themeToggleLink");
    const html = document.documentElement;
    const icon = btn.querySelector("i");
    setTheme(localStorage.getItem("theme") || "light");
    btn.addEventListener("click", e => {
        e.preventDefault();
        setTheme(html.dataset.bsTheme === "dark" ? "light" : "dark");
    });

    function setTheme(t) {
        html.dataset.bsTheme = t;
        localStorage.setItem("theme", t);
        icon.classList.toggle("bi-toggle-on", t === "dark");
        icon.classList.toggle("bi-toggle-off", t !== "dark");
    }
}

//-------------------------------- FILTER -------------------------------//
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



//-------------------------------- EVENTS -------------------------------//
function initSectionEvents() {
    const container = document.getElementById("section-container");
    container.addEventListener("click", (e) => {
        const link = e.target.closest("a[data-name]");
        if (link) {
            handleLinkClick(link);
            return;
        }
        const sectionEl = e.target.closest("section");
        if (sectionEl && !e.target.closest("a")) {
            handleSectionToggle(sectionEl);
        }
    });

    function handleLinkClick(link) {
        link.preventDefault?.();
        const { s, c, i, name } = link.dataset;
        const dataSource = filteredSectionsData || sectionsData;
        let item = getItemByIndex(dataSource, s, c, i);
        if (!item && name) {
            item = getItemByName(dataSource, name);
        }
        if (item) renderRightPane(item);
    }

    function getItemByIndex(dataSource, s, c, i) {
        if (s === undefined || c === undefined || i === undefined) return null;
        const section = dataSource[s];
        if (!section) return null;
        if (c >= 0 && section.items) {
            return section.items[c]?.items[i] || null;
        } else if (section.links) {
            return section.links[i] || null;
        }
        return null;
    }

    function getItemByName(dataSource, name) {
        for (const section of dataSource) {
            if (section.items) {
                for (const sub of section.items) {
                    const found = sub.items.find((it) => it.name === name);
                    if (found) return found;
                }
            }
            if (section.links) {
                const found = section.links.find((it) => it.name === name);
                if (found) return found;
            }
        }
        return null;
    }

    function handleSectionToggle(sectionEl) {
        const isOpen = sectionEl.classList.contains("open");
        if (filteredSectionsData) {
            toggleFilteredSection(sectionEl, !isOpen);
        } else {
            toggleNormalSection(sectionEl, !isOpen);
        }
    }

    function toggleFilteredSection(sectionEl, open) {
        const content = sectionEl.querySelector(".section-content");
        if (open) {
            sectionEl.classList.add("open");
            if (content) content.style.display = "block";
        } else {
            sectionEl.classList.remove("open");
            if (content) content.style.display = "none";
        }
    }

    function toggleNormalSection(sectionEl, open) {
        const allSections = document.querySelectorAll("#section-container section");
        allSections.forEach((sec) => {
            sec.classList.remove("open");
            const cont = sec.querySelector(".section-content");
            if (cont) cont.style.display = "none";
        });
        if (!open) return;
        sectionEl.classList.add("open");
        const idx = parseInt(sectionEl.dataset.section, 10);
        const content = sectionEl.querySelector(".section-content");
        if (!content.dataset.loaded) {
            const section = sectionsData[idx];
            content.innerHTML = renderSection(section);
            content.dataset.loaded = true;
        }
        content.style.display = "block";
    }
}
