document.addEventListener("DOMContentLoaded", eventListeners);

function eventListeners() {
    const filterElement = document.getElementById("filter-id");
    const brandElement = document.querySelector(".navbar-brand");
    const rightPaneElement = document.getElementById("rightpane-id");
    const bsRightPaneElement = rightPaneElement ? bootstrap.Offcanvas.getOrCreateInstance(rightPaneElement) : null;

    renderFooter();
    renderSections();
    initSectionEvents();
    initTheme();

    if (filterElement) {
        filterElement.addEventListener("input", e => renderFilteredSections(e.target.value));
        filterElement.addEventListener("search", () => handleBrandClick());
    }
    
    if (brandElement) brandElement.addEventListener("click", handleBrandClick);
    
    document.addEventListener("keydown", handleEscapeOrClose);

    function handleBrandClick(e) {
        e?.preventDefault?.();
        resetAndClose();
        renderSections();
        if (bsRightPaneElement?._isShown) bsRightPaneElement.hide();
    }

    function handleEscapeOrClose(e) {
        if (e.key !== "Escape") return;
        if (bsRightPaneElement && rightPaneElement.classList.contains("show")) {
            bsRightPaneElement.hide();
        } else {
            resetAndClose();
            renderSections();
        }
    }

    function resetAndClose() {
        if (!filterElement) return;
        filterElement.value = "";
        filterElementedSectionsData = null;
        renderSections(sectionsData, false, false);
    }
}

function initSectionEvents() {
    const contentContainer = document.getElementById("content-container");
    contentContainer.addEventListener("click", (e) => {
        const link = e.target.closest("a[data-name]");
        if (link) {
            handleLinkClick(link);
            return;
        }
        const sectionElement = e.target.closest("section");
        if (sectionElement && !e.target.closest("a")) {
            handleSectionToggle(sectionElement);
        }
    });

    function handleLinkClick(link) {
        link.preventDefault?.();
        const scrollY = window.scrollY;
        const name = link.dataset.name;
        const item = findItemByName(sectionsData, name);
        if (item) renderRightPane(item);
        setTimeout(() => {
            window.scrollTo(0, scrollY);
        }, 0);
    }

    function findItemByName(items, name) {
        for (const item of items) {
            if (item.name === name) return item;
            if (item.items && Array.isArray(item.items)) {
                const found = findItemByName(item.items, name);
                if (found) return found;
            }
        }
        return null;
    }

    function handleSectionToggle(sectionElement) {
        const filterId = document.getElementById("filter-id");
        const isFiltered = filterId && filterId.value.trim() !== "";
        const isSectionClosed = !sectionElement.classList.contains("open");
        if (!isFiltered) { // close other sections, except when filtered
            const sectionElements = sectionElement.parentElement.querySelectorAll("section");
            sectionElements.forEach(currentSectionElement => {
                if (currentSectionElement !== sectionElement) {
                    closeSection(currentSectionElement);
                }
            });
        }
        if (isSectionClosed) openSection(sectionElement);
        else closeSection(sectionElement);

        function openSection(sectionElement) {
            sectionElement.classList.add("open");
            const content = sectionElement.querySelector(".section-content");
            if (content) content.style.display = "block";
        }

        function closeSection(sectionElement) {
            sectionElement.classList.remove("open");
            const content = sectionElement.querySelector(".section-content");
            if (content) content.style.display = "none";
        }
    }
}