//-------------------------------- FIELD CONFIGURATION --------------------------------//
const fieldConfig = {
    address: {
        icon: "bi-geo-alt",
        render: v =>
            `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    coordinates: {
        icon: "bi-geo",
        render: v =>
            `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    email: {
        icon: "bi-envelope",
        render: v => `<a href="mailto:${v}">${v}</a>`
    },
    hours: {
        icon: "bi-clock",
        render: v => v
    },
    info: {
        icon: "bi-info-circle",
        render: v => v
    },
    phone: {
        icon: "bi-telephone",
        render: v => `<a href="tel:${v.replace(/\s+/g, '')}">${v}</a>`
    },
    phone_emergency: {
        icon: "bi-telephone-plus-fill",
        colorClass: "emergency",
        render: v => `<a href="tel:${v.replace(/\s+/g, '')}" class="emergency">${v}</a>`
    },
    url: {
        icon: "bi-globe",
        render: v => `<a href="${v}" target="_blank">${v}</a>`
    }
};

const DEFAULT_ICON = "bi-dot";

//-------------------------------- GENERIC FIELD RENDERER --------------------------------//
function renderFields(data, container) {
    Object.entries(data).forEach(([key, value]) => {
        if (!value) return;
        if (key === "name" || key === "items") return;

        const config = fieldConfig[key] || {
            icon: DEFAULT_ICON,
            render: v => v
        };

        const colorClass = config.colorClass || "";

        const p = document.createElement("p");
        p.innerHTML = `
            <span class="value ${colorClass}">
                <i class="bi ${config.icon} icon ${colorClass}"></i>
                ${config.render(value)}
            </span>
        `;

        container.appendChild(p);
    });
}

//-------------------------------- OFFICE BLOCK CREATOR --------------------------------//
function createOfficeBlock(office, showName = true) {
    const div = document.createElement("div");
    div.className = "office-block mb-4";

    if (showName && office.name) {
        const title = document.createElement("p");
        title.innerHTML = `<strong>${office.name}</strong>`;

        div.appendChild(title);
        div.appendChild(document.createElement("hr"));
    }

    renderFields(office, div);
    return div;
}

//-------------------------------- LINK ITEM CREATOR --------------------------------//
function createLinkItem(link) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = link.name;
    a.addEventListener("click", function (e) {
        e.preventDefault();

        const offcanvasEl = document.getElementById('linkPane');
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

        const paneNameEl = document.getElementById("paneName");
        if (paneNameEl) paneNameEl.textContent = link.name;

        const offcanvasBody = offcanvasEl.querySelector(".offcanvas-body");

        Array.from(offcanvasBody.children).forEach(child => {
            if (!child.id || child.id !== "paneName") {
                child.remove();
            }
        });

        const topBlock = document.createElement("div");
        topBlock.className = "office-top mb-3";

        const nameTitle = document.createElement("p");
        nameTitle.innerHTML = `<strong>${link.name}</strong>`;

        topBlock.appendChild(nameTitle);
        topBlock.appendChild(document.createElement("hr"));

        offcanvasBody.appendChild(topBlock);

        offcanvasBody.appendChild(createOfficeBlock(link, false));

        if (link.items?.length) {
            link.items.forEach(branch => {
                offcanvasBody.appendChild(createOfficeBlock(branch, true));
            });
        }

        bsOffcanvas.show();
    });

    li.appendChild(a);
    return li;
}

//-------------------------------- LINK LIST CREATOR --------------------------------//
function createLinkList(links, extraClass = "") {
    const ul = document.createElement("ul");
    ul.className = `list-unstyled mb-0 ${extraClass}`.trim();

    links?.forEach(link => ul.appendChild(createLinkItem(link)));

    return ul;
}

//-------------------------------- SECTION CREATOR --------------------------------//
function createSections(sections) {
    const container = document.getElementById("section-container");
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        const sectionEl = document.createElement("section");
        sectionEl.className = "mb-3 border-bottom";

        const header = document.createElement("h2");
        header.className = "h5 mb-3 d-flex justify-content-between align-items-center";
        header.textContent = section.label;

        const chevron = document.createElement("i");
        chevron.className = "bi bi-chevron-down";

        header.appendChild(chevron);
        sectionEl.appendChild(header);

        if (section.items) {
            const wrapper = document.createElement("div");
            wrapper.className = "subcategories-wrapper section-content";
            let row;
            section.items.forEach((subcat, index) => {
                if (index % 4 === 0) {
                    row = document.createElement("div");
                    row.className = "row g-4";
                    wrapper.appendChild(row);
                }

                const col = document.createElement("div");
                col.className = "col-12 col-md-6 col-lg-3";

                const subTitle = document.createElement("h3");
                subTitle.className = "h6 mb-2 subcategory-title";
                subTitle.textContent = subcat.label;

                col.appendChild(subTitle);
                col.appendChild(createLinkList(subcat.items));
                row.appendChild(col);
            });

            sectionEl.appendChild(wrapper);
        }

        else if (section.links) {
            const wrapper = document.createElement("div");
            wrapper.className = "section-content";

            wrapper.appendChild(createLinkList(section.links));

            sectionEl.appendChild(wrapper);
        }

        fragment.appendChild(sectionEl);
    });
    container.appendChild(fragment);
}

//-------------------------------- SECTION OPEN/CLOSE --------------------------------//
const sectionsData = [
    healthcareData,
    realEstateData,
    wineEstateData
];

document.addEventListener("DOMContentLoaded", function () {
    if (sectionsData?.length) {
        createSections(sectionsData);
    }

    const sections = document.querySelectorAll("#section-container section");
    sections.forEach(section => {
        const content = section.querySelector(".section-content");
        if (content) content.style.display = "none";
        section.classList.remove("open");
    });

    sections.forEach(section => {
        section.addEventListener("click", function (event) {
            if (event.target.closest("a")) return;
            const content = this.querySelector(".section-content");
            const isOpen = this.classList.contains("open");

            sections.forEach(s => {
                s.classList.remove("open");
                const c = s.querySelector(".section-content");
                if (c) c.style.display = "none";
            });

            if (!isOpen) {
                this.classList.add("open");
                if (content) content.style.display = "block";
            }
        });
    });
});

//-------------------------------- THEME TOGGLE --------------------------------//
const toggleBtn = document.getElementById("themeToggleLink");
const html = document.documentElement;
const icon = toggleBtn.querySelector("i");

const setTheme = theme => {
    html.dataset.bsTheme = theme;
    localStorage.setItem("theme", theme);
    icon.classList.toggle("bi-toggle-on", theme === "dark");
    icon.classList.toggle("bi-toggle-off", theme !== "dark");
};

setTheme(localStorage.getItem("theme") || "light");

toggleBtn.addEventListener("click", e => {
    e.preventDefault();
    setTheme(html.dataset.bsTheme === "dark" ? "light" : "dark");
});