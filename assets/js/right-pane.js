function renderRightPane(link) {
    const rightPane = document.getElementById("rightpane-id");
    const rightPaneBody = rightPane.querySelector(".offcanvas-body");
    let html = `<div class="mb-3"><p><strong  style="font-size: 1rem;">${link.name}</strong></p><hr></div>`;// HIER
    html += renderRightPaneBlock(link, false, true);
    if (link.items) {
        link.items.forEach(branch => {
            html += renderRightPaneBlock(branch, true, false);
        });
    }
    rightPaneBody.innerHTML = html;
    initPaneAccordion(rightPaneBody);
    bootstrap.Offcanvas.getOrCreateInstance(rightPane).show();

    function renderRightPaneBlock(office, showName = true, isMain = false) {
        const blockId = `block-${office.name?.replace(/\s+/g, "-")}-${Math.random().toString(36).slice(2,6)}`;
        let html = `<div class="pane-block ${isMain ? 'mb-5 main-open open' : 'collapsible'}" data-block="${blockId}">`;
        if (showName && office.name) {
            html += `
                <div class="block-header" ${!isMain ? `data-toggle="${blockId}"` : ""}>
                    <p><strong style="font-size: 1rem;">${office.name}</strong></p>
                    <hr>
                </div>
            `;
        }
        html += `<div class="block-content">`;
        html += renderData(office);
        html += `</div></div>`;
        return html;

        function renderData(data) {
            let html = "";
            for (const [key, val] of Object.entries(data)) {
                if (!val || key === "name" || key === "items") continue;
                const cfg = fieldConfig[key] || { icon: DEFAULT_ICON, render: v => v };
                const color = cfg.colorClass || "";
                html += `
                    <p class="value ${color} mt-3">
                        <i class="bi ${cfg.icon} icon ${color}"></i>${cfg.render(val)}
                    </p>`;
            }
            return html;
        }
    }

    function initPaneAccordion(container) {
        const headers = container.querySelectorAll(".block-header[data-toggle]");
        headers.forEach(header => {
            header.addEventListener("click", () => {
                const blockId = header.dataset.toggle;
                const currentBlock = container.querySelector(`[data-block="${blockId}"]`);
                const isOpen = currentBlock.classList.contains("open");
                container.querySelectorAll(".pane-block.collapsible").forEach(b => {
                    b.classList.remove("open");
                });
                if (!isOpen) {
                    currentBlock.classList.add("open");
                    currentBlock.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        });
    }
}
