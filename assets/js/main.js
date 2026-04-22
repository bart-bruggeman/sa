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
    renderAllData();
    initSectionEvents();
    initTheme();

    filterElement?.addEventListener("input", e => renderFilteredData(e.target.value));
    filterElement?.addEventListener("search", handleBrandClick);
    brandElement?.addEventListener("click", handleBrandClick);
    document.addEventListener("keydown", handleKeydown);
}

function handleBrandClick(e) {
    e?.preventDefault?.();
    resetFilter();
    renderAllData();
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
    renderAllData(allData, false, false);
}

function initSectionEvents() {
    const container = document.getElementById("content-container");
    container?.addEventListener("click", handleContainerClick);
}

function handleContainerClick(e) {
    const link = e.target.closest("a[data-name]");
    if (link) return handleLinkClick(link);

    const subsection = e.target.closest(".subsection");
    if (subsection && !e.target.closest("a")) {
        return toggleItem({element: subsection, siblingSelector: ".subsection", contentSelector: ".subsection-content"});
    }

    const section = e.target.closest("section");
    if (section && !subsection && !e.target.closest("a")) {
        return toggleItem({element: section, siblingSelector: "section", contentSelector: ".section-content", guard: () => filterElement?.value.trim() });
    }
}

function handleLinkClick(link) {
    link.preventDefault?.();
    const scrollY = window.scrollY;
    const item = findItemByName(allData, link.dataset.name);
    if (item) renderRightPane(item, [allData], links);
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

function toggleItem({element, siblingSelector, contentSelector, guard = () => false}) {
    if (guard()) return;
    const isOpen = element.classList.contains("open");
    element.parentElement
        .querySelectorAll(siblingSelector)
        .forEach(el => {
            if (el !== element) setOpen(el, false, contentSelector);
        });
    setOpen(element, !isOpen, contentSelector);
}

function setOpen(section, open, contentSelector) {
    section.classList.toggle("open", open);
    const content = section.querySelector(contentSelector);
    if (content) content.style.display = open ? "block" : "none";
    if (!open) {
        const openChildren = section.querySelectorAll(".open");
        openChildren.forEach(child => {
            child.classList.remove("open");
            const childContent = child.querySelector(
                ".section-content, .subsection-content"
            );
            if (childContent) childContent.style.display = "none";
        });
    }
}