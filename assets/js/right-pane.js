let idCounter = 0;

function renderRightPane(link) {
    idCounter = 0;
    const rightPane = document.getElementById("rightpane-id");
    const rightPaneBody = rightPane.querySelector(".offcanvas-body");

    const blocks = [
        { ...link, isMain: true },
        ...(link.items || []).map(item => ({ ...item, isMain: false }))
    ];

    rightPaneBody.innerHTML = `${blocks.map(renderBlock).join("")}`;

    initPaneAccordion(rightPaneBody);
    bootstrap.Offcanvas.getOrCreateInstance(rightPane).show();
}

function renderBlock(office) {
    const blockId = `block-${idCounter++}`;
    const isMain = office.isMain;

    return `
        <div class="pane-block ${isMain ? 'open mb-0' : 'collapsible'}" data-block="${blockId}">
            
            ${renderHeader(office, blockId, isMain)}

            <div class="block-content">
                ${renderData(office)}
            </div>
            <hr>
        </div>
    `;
}

function renderHeader(office, blockId, isMain) {
    if (!office.name) return "";

    return `
        <div class="${isMain ? `block-header` : `block-header-n`}" ${!isMain ? `data-toggle="${blockId}"` : ""}>
            <div class="header-content d-flex justify-content-between align-items-center">
                <p class="mb-0"><strong>${office.name}</strong></p>
                ${!isMain ? `<i class="bi bi-chevron-down toggle-icon"></i>` : ""}
            </div>
        </div>
    `;
}

function renderData(data) {
    return Object.entries(data)
        .filter(([key, val]) => val && key !== "name" && key !== "items" && key !== "isMain")
        .map(([key, val]) => {
            const cfg = fieldConfig[key] || { icon: DEFAULT_ICON, render: v => v };
            const color = cfg.colorClass || "";

            return `
                <p class="value ${color} mt-3">
                    <i class="bi ${cfg.icon} icon ${color}"></i>${cfg.render(val)}
                </p>
            `;
        })
        .join("");
}

function initPaneAccordion(container) {
    container.querySelectorAll(".block-header-n[data-toggle]").forEach(header => {
        header.addEventListener("click", () => {
            const blockId = header.dataset.toggle;
            const currentBlock = container.querySelector(`[data-block="${blockId}"]`);
            const isOpen = currentBlock.classList.contains("open");

            container.querySelectorAll(".pane-block.collapsible").forEach(b => {
                b.classList.remove("open");
                const icon = b.querySelector(".toggle-icon");
                if (icon) icon.style.transform = "rotate(0deg)";
            });

            if (!isOpen) {
                currentBlock.classList.add("open");
                const icon = currentBlock.querySelector(".toggle-icon");
                if (icon) icon.style.transform = "rotate(180deg)";
                currentBlock.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}