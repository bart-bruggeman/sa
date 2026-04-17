let filterElement;
let brandElement;
let rightPaneElement;
let bsRightPane;

document.addEventListener("DOMContentLoaded", init);

function init() {
    filterElement = document.getElementById("filter-id");
    brandElement = document.querySelector(".navbar-brand");
    rightPaneElement = document.getElementById("rightpane-id");
    bsRightPane = rightPaneElement
        ? bootstrap.Offcanvas.getOrCreateInstance(rightPaneElement)
        : null;

    if (rightPaneElement && filterElement) {
        rightPaneElement.addEventListener("show.bs.offcanvas", () => filterElement.disabled = true);
        rightPaneElement.addEventListener("hidden.bs.offcanvas", () => requestAnimationFrame(() => filterElement.disabled = false));
    }

    renderFooter();
    renderCategories();
    initSectionEvents();
    initTheme();

    filterElement?.addEventListener("input", e => renderFilteredCategories(e.target.value));
    filterElement?.addEventListener("search", handleBrandClick);
    brandElement?.addEventListener("click", handleBrandClick);
    document.addEventListener("keydown", handleKeydown);
}

function handleBrandClick(e) {
    e?.preventDefault?.();
    resetFilter();
    renderCategories();
    bsRightPane?._isShown && bsRightPane.hide();
}

function handleKeydown(e) {
    if (e.key === "Escape") {
        isRightPaneOpen() ? bsRightPane?.hide() : resetFilter();
    }
}

function isRightPaneOpen() {
    return bsRightPane && rightPaneElement?.classList.contains("show");
}

function resetFilter() {
    if (!filterElement) return;
    filterElement.value = "";
    renderCategories(sectionsData, false, false);
}

function initSectionEvents() {
    const container = document.getElementById("content-container");
    container?.addEventListener("click", handleContainerClick);
}

function handleContainerClick(e) {
    const link = e.target.closest("a[data-name]");
    if (link) return handleLinkClick(link);
    const level2Section = e.target.closest(".subsection");
    if (level2Section && !e.target.closest("a")) return toggleLevel2Section(level2Section);
    const section = e.target.closest("section");
    if (section && !level2Section && !e.target.closest("a")) toggleSection(section);
}

function handleLinkClick(link) {
    link.preventDefault?.();
    const scrollY = window.scrollY;
    const item = findItemByName(sectionsData, link.dataset.name);
    if (item) renderRightPane(item);
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
    if (filterElement?.value.trim()) return;
    toggleWithSiblings(section, "section", ".section-content");
}

function toggleLevel2Section(section) {
    toggleWithSiblings(section, ".subsection", ".subsection-content");
}

function toggleWithSiblings(section, selector, contentSelector) {
    const isOpen = section.classList.contains("open");
    section.parentElement.querySelectorAll(selector).forEach(s => s !== section && setOpen(s, false, contentSelector));
    setOpen(section, !isOpen, contentSelector);
}

function setOpen(section, open, contentSelector) {
    section.classList.toggle("open", open);
    const content = section.querySelector(contentSelector);
    if (content) content.style.display = open ? "block" : "none";
}