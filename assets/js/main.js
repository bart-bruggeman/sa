document.addEventListener("DOMContentLoaded", eventListeners);

function eventListeners() {
    const filter = document.getElementById("filter-id");
    const brand = document.querySelector(".navbar-brand");
    const offcanvasEl = document.getElementById("rightpane-id");
    const bsOffcanvas = offcanvasEl ? bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl) : null;

    renderFooter();
    renderSections();
    initSectionEvents();
    initTheme();

    if (filter) {
        filter.addEventListener("input", e => renderFilteredSections(e.target.value));
        filter.addEventListener("search", () => handleBrandClick());
    }
    
    if (brand) brand.addEventListener("click", handleBrandClick);
    
    document.addEventListener("keydown", handleEscapeOrClose);

    function handleBrandClick(e) {
        e?.preventDefault?.();
        resetAndClose();
        renderSections();
        if (bsOffcanvas?._isShown) bsOffcanvas.hide();
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
        if (!filter) return;
        filter.value = "";
        filteredSectionsData = null;
        renderSections(sectionsData, false, false);
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
        const scrollY = window.scrollY;
        const name = link.dataset.name;
        const item = getItemByName(sectionsData, name);
        if (item) renderRightPane(item);
        setTimeout(() => {
            window.scrollTo(0, scrollY);
        }, 0);
    }

    function getItemByName(items, name) {
        for (const item of items) {
            if (item.name === name) return item;
            if (item.items && Array.isArray(item.items)) {
                const found = getItemByName(item.items, name);
                if (found) return found;
            }
        }
        return null;
    }

    function handleSectionToggle(sectionEl) {
        const search = document.getElementById("filter-id");
        const isFiltered = search && search.value.trim() !== "";
        const isSectionClosed = !sectionEl.classList.contains("open");
        if (!isFiltered) { // close other sections, except when filtered data
            const siblings = sectionEl.parentElement.querySelectorAll("section");
            siblings.forEach(sec => {
                if (sec !== sectionEl) {
                    closeSection(sec);
                }
            });
        }
        if (isSectionClosed) openSection(sectionEl);
        else closeSection(sectionEl);

        function openSection(section) {
            section.classList.add("open");
            const content = section.querySelector(".section-content");
            if (content) content.style.display = "block";
        }

        function closeSection(section) {
            section.classList.remove("open");
            const content = section.querySelector(".section-content");
            if (content) content.style.display = "none";
        }
    }
}