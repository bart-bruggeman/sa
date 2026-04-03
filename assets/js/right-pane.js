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
        <section class="pane-block ${isMain ? 'open mb-0' : 'collapsible'}" data-block="${blockId}">
            
            ${renderHeader(office, blockId, isMain)}

            <div class="block-content">
                ${renderData(office)}
            </div>
        </section>
    `;
}

function renderHeader(office, blockId, isMain) {
    if (!office.name) return "";

    return `
        <div class="${isMain ? `block-header` : `block-header-n`}" ${!isMain ? `data-toggle="${blockId}"` : ""}>
            <div class="header-content d-flex justify-content-between align-items-center">
                <h3 class="mb-0">${office.name}</h3>
                ${!isMain ? `<i class="bi bi-chevron-down toggle-icon"></i>` : ""}
            </div>
        </div>
    `;
}

function renderData(data) {
    return Object.entries(data)
        .filter(([key, val]) => shouldRenderField(key, val))
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

    function shouldRenderField(key, val) {
        return val && key !== "items" && key !== "name" && key !== "isMain";
    }
}

function initPaneAccordion(container) {
    container.querySelectorAll(".block-header-n[data-toggle]").forEach(header => {
        header.addEventListener("click", (e) => {
            e.stopPropagation();
            const blockId = header.dataset.toggle;
            const currentBlock = container.querySelector(`[data-block="${blockId}"]`);
            const isOpen = currentBlock.classList.contains("open");
            closeAll(container);
            if (!isOpen) {
                openBlock(currentBlock);
            }
        });
    });

    container.querySelectorAll(".pane-block.collapsible").forEach(block => {
        block.addEventListener("click", (e) => {
            const clickedHeader = e.target.closest(".block-header-n");
            const clickedLink = e.target.closest("a");
            if (clickedHeader || clickedLink) return;
            closeAll(container);
        });
    });

    function closeAll(container) {
        container.querySelectorAll(".pane-block.collapsible").forEach(b => {
            b.classList.remove("open");
            const icon = b.querySelector(".toggle-icon");
            if (icon) icon.style.transform = "rotate(0deg)";
        });
    }

    function openBlock(block) {
        block.classList.add("open");
        const icon = block.querySelector(".toggle-icon");
        if (icon) icon.style.transform = "rotate(180deg)";
        block.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}