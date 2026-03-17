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

    if (search) search.addEventListener("input", e => renderFilteredSections(e.target.value));
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
        const name = link.dataset.name;
        const item = getItemByName(sectionsData, name);
        if (item) renderRightPane(item);
    }

    function getItemByName(dataSource, name) {
        for (const section of dataSource) {
            // level 2 or level 3
            if (section.items) {
                for (const item1 of section.items) {
                    // level 2 (direct)
                    if (item1.name === name) return item1;
                    // level 2 (sub)
                    if (item1.items) {
                        const found = item1.items.find(i => i.name === name);
                        if (found) return found;
                        //level 3
                        for (const item2 of item1.items) {
                            if (item2.items) {
                                const found3 = item2.items.find(i => i.name === name);
                                if (found3) return found3;
                            } else if (item2.name === name) {
                                return item2;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    function handleSectionToggle(sectionEl) {
        const open = !sectionEl.classList.contains("open");
        const search = document.getElementById("directory-search");
        const isFiltered = search && search.value.trim() !== "";
        sectionEl.parentElement.querySelectorAll("section").forEach(sec => {
            if (sec !== sectionEl && !isFiltered) {
                sec.classList.remove("open");
                const content = sec.querySelector(".section-content");
                if (content) content.style.display = "none";
            }
        });
        sectionEl.classList.toggle("open", open);
        const content = sectionEl.querySelector(".section-content");
        if (content) content.style.display = open ? "block" : "none";
    }
}