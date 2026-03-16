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
            if (section.items) {
                for (const sub of section.items) {
                    const found = sub.items.find(it => it.name === name);
                    if (found) return found;
                }
            }
            if (section.links) {
                const found = section.links.find(it => it.name === name);
                if (found) return found;
            }
        }
        return null;
    }

    function handleSectionToggle(sectionEl) {
        const open = !sectionEl.classList.contains("open");
        const search = document.getElementById("directory-search");
        const isFiltered = search && search.value.trim() !== "";
        container.querySelectorAll("section").forEach(sec => {
            if (sec !== sectionEl && !isFiltered) {
                sec.classList.remove("open");
                sec.querySelector(".section-content").style.display = "none";
            }
        });
        sectionEl.classList.toggle("open", open);
        sectionEl.querySelector(".section-content").style.display = open ? "block" : "none";
    }
}