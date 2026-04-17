const SKIP_FIELDS = ["items", "name", "displayName", "id", "type", "mode", "coordinates", "isMain"];

let idCounter = 0;
let scrollTimeout;

function renderRightPane(link, linkedSources = [], links = []) {
    idCounter = 0;
    const rightPane = document.getElementById("rightpane-id");
    const body = rightPane.querySelector(".offcanvas-body");
    const dataIndex = buildDataIndex(...linkedSources);
    const blocksData = buildBlocks(link, dataIndex, links);
    body.innerHTML = blocksData
        .map((block, index) => renderBlock(block, index))
        .join('');
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
            if (!e.target.closest(".block-header-n") && !e.target.closest("a")) {
                closeAll();
            }
        });
    });
    bootstrap.Offcanvas.getOrCreateInstance(rightPane).show();
}

function buildBlocks(link, dataIndex, links = []) {
    const baseBlocks = [
        { ...link, isMain: true },
        ...(link.items || []).map(item => ({ ...item, isMain: false }))
    ];
    const currentId = link.id;
    const linkedBlocks = resolveLinkedBlocks(links, dataIndex, currentId);
    return [
        ...baseBlocks,
        ...linkedBlocks
    ];
}

function renderBlock({ isMain, ...office }, index) {
    const blockId = `block-${index}`;
    const title = getSectionTitle(office);
    const header = title
        ? `<div class="${isMain ? 'block-header' : 'block-header-n'}" ${!isMain ? `data-toggle="${blockId}"` : ''}>
                <div class="header-content d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">${title}</h3>
                    ${!isMain ? '<i class="bi bi-chevron-down toggle-icon"></i>' : ''}
                </div>
           </div>`
        : '';
    const content = Object.entries(office)
        .filter(([k, v]) =>
            v &&
            !SKIP_FIELDS.includes(k) &&
            k !== "id" &&
            k !== "type" &&
            k !== "name" &&
            k !== "displayName"
        )
        .map(([k, v]) => {
            const { icon = DEFAULT_ICON, colorClass = '', render = val => val } = iconMap[k] || {};
            return `<p class="value ${colorClass} mt-3">
                        <i class="bi ${icon} icon ${colorClass}"></i>${render(v, office)}
                    </p>`;
        })
        .join('');
    return `
        <section class="pane-block ${isMain ? 'open mb-0' : 'collapsible'}" data-block="${blockId}">
            ${header}
            <div class="block-content">${content}</div>
        </section>
    `;
}

function buildDataIndex(...sources) {
    const index = new Map();
    const walk = obj => {
        if (Array.isArray(obj)) {
            obj.forEach(walk);
            return;
        }
        if (obj && typeof obj === "object") {
            if (obj.type === "data" && obj.id) {
                index.set(obj.id, obj);
            }
            Object.values(obj).forEach(walk);
        }
    };
    sources.forEach(walk);
    return index;
}

function resolveLinkedBlocks(links, dataIndex, currentId) {
    const result = [];
    const seen = new Set();
    if (!currentId) return result;
    links.forEach(group => {
        group.forEach(linkObj => {
            const { id1, id2 } = linkObj;
            if (id1 === currentId || id2 === currentId) {
                const otherId = id1 === currentId ? id2 : id1;
                if (seen.has(otherId)) return;
                const data = dataIndex.get(otherId);
                if (data) {
                    result.push({
                        ...data,
                        isMain: false
                    });
                    seen.add(otherId);
                }
            }
        });
    });
    return result;
}

function getSectionTitle(obj) {
    return obj.displayName ?? obj.name ?? "Untitled";
}