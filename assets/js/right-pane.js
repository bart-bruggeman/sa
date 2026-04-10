let idCounter = 0;
let scrollTimeout;

function renderRightPane(link) {
    idCounter = 0;
    const rightPane = document.getElementById("rightpane-id");
    const body = rightPane.querySelector(".offcanvas-body");
    const blocks = [{ ...link, isMain: true }, ...(link.items || []).map(item => ({ ...item, isMain: false }))];
    body.innerHTML = blocks.map(({ isMain, ...office }) => {
        const blockId = `block-${idCounter++}`;
        const header = office.name
            ? `<div class="${isMain ? 'block-header' : 'block-header-n'}" ${!isMain ? `data-toggle="${blockId}"` : ''}>
                    <div class="header-content d-flex justify-content-between align-items-center">
                        <h3 class="mb-0">${office.name}</h3>
                        ${!isMain ? '<i class="bi bi-chevron-down toggle-icon"></i>' : ''}
                    </div>
               </div>`
            : '';
        const content = Object.entries(office)
            .filter(([k, v]) => v && !["items", "name", "mode", "coordinates", "isMain"].includes(k))
            .map(([k, v]) => {
                const { icon = DEFAULT_ICON, colorClass = '', render = val => val } = iconMap[k] || {};
                return `<p class="value ${colorClass} mt-3">
                            <i class="bi ${icon} icon ${colorClass}"></i>${render(v, office || {})}
                        </p>`;
            }).join('');
        return `<section class="pane-block ${isMain ? 'open mb-0' : 'collapsible'}" data-block="${blockId}">
                    ${header}<div class="block-content">${content}</div>
                </section>`;
    }).join('');
    const blocksCollapsible = body.querySelectorAll(".pane-block.collapsible");
    const headersToggle = body.querySelectorAll(".block-header-n[data-toggle]");
    const closeAll = () => blocksCollapsible.forEach(b => {
        b.classList.remove("open");
        const icon = b.querySelector(".toggle-icon");
        if (icon) icon.style.transform = "";
    });
    const openBlock = block => {
        block.classList.add("open");
        const icon = block.querySelector(".toggle-icon");
        if (icon) icon.style.transform = "rotate(180deg)";
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            block.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    };
    headersToggle.forEach(header => {
        header.addEventListener("click", e => {
            e.stopPropagation();
            const block = body.querySelector(`[data-block="${header.dataset.toggle}"]`);
            const isOpen = block.classList.contains("open");
            closeAll();
            if (!isOpen) openBlock(block);
        });
    });
    blocksCollapsible.forEach(block => {
        block.addEventListener("click", e => {
            if (!e.target.closest(".block-header-n") && !e.target.closest("a")) closeAll();
        });
    });
    bootstrap.Offcanvas.getOrCreateInstance(rightPane).show();
}