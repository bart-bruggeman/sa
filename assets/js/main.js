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
