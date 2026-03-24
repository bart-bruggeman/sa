document.addEventListener("DOMContentLoaded", init);

function init() {
    const filterElement = document.getElementById("filter-id");
    const brandElement = document.querySelector(".navbar-brand");
    const rightPaneElement = document.getElementById("rightpane-id");
    const bsRightPane = rightPaneElement
        ? bootstrap.Offcanvas.getOrCreateInstance(rightPaneElement)
        : null;

    renderFooter();
    renderSections();
    initSectionEvents();
    initTheme();

    if (filterElement) {
        filterElement.addEventListener("input", onFilterInput);
        filterElement.addEventListener("search", handleBrandClick);
    }
    if (brandElement) {
        brandElement.addEventListener("click", handleBrandClick);
    }
    document.addEventListener("keydown", handleKeydown);

    function onFilterInput(e) {
        renderFilteredSections(e.target.value);
    }

    function handleBrandClick(e) {
        e?.preventDefault?.();
        resetFilter();
        renderSections();
        if (bsRightPane?._isShown) {
            bsRightPane.hide();
        }
    }

    function handleKeydown(e) {
        if (e.key !== "Escape") return;

        const isRightPaneOpen = bsRightPane && rightPaneElement.classList.contains("show");
        if (isRightPaneOpen) {
            bsRightPane.hide();
        } else {
            resetFilter();
            renderSections();
        }
    }

    function resetFilter() {
        if (!filterElement) return;
        filterElement.value = "";
        filterElementedSectionsData = null;
        renderSections(sectionsData, false, false);
    }
}

function initSectionEvents() {
    const container = document.getElementById("content-container");
    if (!container) return;
    container.addEventListener("click", handleContainerClick);

    function handleContainerClick(e) {
        const link = e.target.closest("a[data-name]");
        if (link) {
            handleLinkClick(link);
            return;
        }
        const section = e.target.closest("section");
        if (
            section &&
            !e.target.closest("a") &&
            !e.target.closest(".nav-tabs") &&
            !e.target.closest(".dropdown-menu")
        ) {
            toggleSection(section);
        }
    }

    function handleLinkClick(link) {
        link.preventDefault?.();
        const scrollY = window.scrollY;
        const name = link.dataset.name;
        const item = findItemByName(sectionsData, name);
        if (item) {
            renderRightPane(item);
        }
        setTimeout(() => window.scrollTo(0, scrollY), 0);
    }

    function findItemByName(items, name) {
        for (const item of items) {
            if (item.name === name) return item;
            if (Array.isArray(item.items)) {
                const found = findItemByName(item.items, name);
                if (found) return found;
            }
        }
        return null;
    }

    function toggleSection(section) {
        const filter = document.getElementById("filter-id");
        const isFiltered = filter && filter.value.trim() !== "";
        if (isFiltered) return;
        const isOpen = section.classList.contains("open");
        const siblings = section.parentElement.querySelectorAll("section");
        siblings.forEach(sibling => {
            if (sibling !== section) {
                setSectionState(sibling, false);
            }
        });
        setSectionState(section, !isOpen);
    }

    function setSectionState(section, open) {
        section.classList.toggle("open", open);
        const content = section.querySelector(".section-content");
        if (content) {
            content.style.display = open ? "block" : "none";
        }
    }
}