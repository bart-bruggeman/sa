function renderRightPane(link) {
    const rightPane = document.getElementById("rightpane-id");
    const rightPaneBody = rightPane.querySelector(".offcanvas-body");
    let html = `<div class="mb-3"><p><strong  style="font-size: 1rem;">${link.name}</strong></p><hr></div>`;// HIER
    html += renderRightPaneBlock(link, false);
    if (link.items) {
        link.items.forEach(branch => {
            html += renderRightPaneBlock(branch, true);
        });
    }
    rightPaneBody.innerHTML = html;
    bootstrap.Offcanvas.getOrCreateInstance(rightPane).show();

    function renderRightPaneBlock(office, showName = true) {
        let html = `<div class="mb-4 pb-2">`;
        html += renderHeader(office, showName);
        html += renderData(office);
        html += `</div>`;
        return html;

        function renderHeader(office, showName) {
            let html = "";
            if (showName && office.name) {
                html += `<p><strong style="font-size: 1rem;">${office.name}</strong></p><hr>`;//HIER
            }
            return html;
        }
        
        function renderData(data) {
            let html = "";
            for (const [key, val] of Object.entries(data)) {
                if (!val || key === "name" || key === "items") continue;
                const cfg = fieldConfig[key] || { icon: DEFAULT_ICON, render: v => v };
                const color = cfg.colorClass || "";
                html += `<p class="value ${color} mt-3">
                            <i class="bi ${cfg.icon} icon ${color}"></i>${cfg.render(val)}
                        </p>`;
            }
            return html;
        }
    }

}
