function renderRightPane(link) {
    const pane = document.getElementById("linkPane");
    const body = pane.querySelector(".offcanvas-body");
    let html = `<div class="office-top mb-3"><p><strong>${link.name}</strong></p><hr></div>`;
    html += renderRightPaneBlock(link, false);
    if (link.items) {
        link.items.forEach(branch => {
            html += renderRightPaneBlock(branch, true);
        });
    }
    body.innerHTML = html;
    bootstrap.Offcanvas.getOrCreateInstance(pane).show();

    function renderRightPaneBlock(office, showName = true) {
        let html = `<div class="office-block mb-4">`;
        html += renderHeader(office, showName);
        html += renderData(office);
        html += `</div>`;
        return html;

        function renderHeader(office, showName) {
            let html = "";
            if (showName && office.name) {
                html += `<p><strong>${office.name}</strong></p><hr>`;
            }
            return html;
        }
        
        function renderData(data) {
            let html = "";
            for (const [key, val] of Object.entries(data)) {
                if (!val || key === "name" || key === "items") continue;
                const cfg = fieldConfig[key] || { icon: DEFAULT_ICON, render: v => v };
                const color = cfg.colorClass || "";
                html += `<p><span class="value ${color}"><i class="bi ${cfg.icon} icon ${color}"></i>${cfg.render(val)}</span></p>`;
            }
            return html;
        }
    }

}
