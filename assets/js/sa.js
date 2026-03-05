//------------------------------------------ BEGIN section content -------------------------------------------//

function updatePane(paneId, value, type = "text") {
    const el = document.getElementById(paneId);
    const textEl = el.querySelector(".text");

    if (value && value !== "-") {
        switch (type) {
            // "type" contains only plain text => textEl.textContent = link.info;
            // "type" contains html text       => textEl.innerHTML = link.info;
            case "link":
                textEl.innerHTML = `<a href="${value}" target="_blank">${value}</a>`;
                break;
            case "phone":
                textEl.innerHTML = `<a href="tel:${value.replace(/\s+/g,'')}">${value}</a>`;
                break;
            case "mail":
                textEl.innerHTML = `<a href="mailto:${value}">${value}</a>`;
                break;
            case "maps":
                textEl.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}" target="_blank">${value}</a>`;
                break;
            case "info":
                textEl.textContent = link.info;
                break;
            default:
                textEl.textContent = value;
        }
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
}


function createSections(sections) {
    const container = document.getElementById("section-container");
    const fragment = document.createDocumentFragment();

    const createLinkItem = (link, category = "", subcategory = "") => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#"; 
        a.textContent = link.text;

        a.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("paneName").textContent = link.text;

            updatePane("paneWebsite", link.url, "link");
            updatePane("paneAddress", link.address, "maps");
            updatePane("paneCoordinates", link.coordinates, "maps");
            updatePane("panePhone", link.phone, "phone");
            updatePane("paneMail", link.email, "mail");
            updatePane("paneInfo", link.info);
            
            const offcanvasEl = document.getElementById('linkPane');
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            bsOffcanvas.show();
        });

        li.appendChild(a);
        return li;
    };

    const createLinkList = (links, category = "", subcategory = "", extraClass = "") => {
        const ul = document.createElement("ul");
        ul.className = `list-unstyled mb-0 ${extraClass}`.trim();
        links?.forEach(link => ul.appendChild(createLinkItem(link, category, subcategory)));
        return ul;
    };

    sections.forEach(section => {
        const sectionEl = document.createElement("section");
        sectionEl.className = "mb-3 border-bottom";

        const header = document.createElement("h2");
        header.className = "h5 mb-3 d-flex justify-content-between align-items-center";
        header.textContent = section.category;

        const chevron = document.createElement("i");
        chevron.className = "bi bi-chevron-down";
        header.appendChild(chevron);
        sectionEl.appendChild(header);

        if (section.subcategories) { // CASE 1: subcategories
            const wrapper = document.createElement("div");
            wrapper.className = "subcategories-wrapper section-content";

            let row;
            section.subcategories.forEach((subcat, index) => {
                if (index % 4 === 0) {
                    row = document.createElement("div");
                    row.className = "row g-4";
                    wrapper.appendChild(row);
                }
                const col = document.createElement("div");
                col.className = "col-12 col-md-6 col-lg-3";

                const subTitle = document.createElement("h3");
                subTitle.className = "h6 mb-2 subcategory-title";
                subTitle.textContent = subcat.subcategory;

                col.appendChild(subTitle);
                col.appendChild(createLinkList(subcat.links, section.category, subcat.subcategory));
                row.appendChild(col);
            });

            sectionEl.appendChild(wrapper);
        } else if (section.links) { // CASE 2: no subcategories
            sectionEl.appendChild(createLinkList(section.links, section.category, ""));
        }

        fragment.appendChild(sectionEl);
    });

    container.appendChild(fragment);
}
//------------------------------------------- END section content --------------------------------------------//


//---------------------------------- BEGIN open/close section functionality ----------------------------------//
document.addEventListener("DOMContentLoaded", function () {
    createSections(sectionsData);

    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const content = section.querySelector(".section-content");
        if (content) content.style.display = "none";
        section.classList.remove("open");
    });

    let currentlyOpenSection = null;

    sections.forEach(section => {
        section.addEventListener("click", function (event) {
            if (event.target.closest("a")) return;
            const content = this.querySelector(".section-content");

            if (currentlyOpenSection === this) {
                if (content) content.style.display = "none";
                this.classList.remove("open");
                currentlyOpenSection = null;
            } else {
                sections.forEach(s => {
                    const otherContent = s.querySelector(".section-content");
                    if (otherContent) otherContent.style.display = "none";
                    s.classList.remove("open");
                });
                if (content) content.style.display = "block";
                this.classList.add("open");
                currentlyOpenSection = this;
            }
        });
    });
});
//---------------------------------- END open/close section functionality  -----------------------------------//


//-------------------------------- BEGIN toggle and save theme functionality ---------------------------------//
const toggleBtn = document.getElementById("themeToggleLink");
const html = document.documentElement;
const icon = toggleBtn.querySelector("i");

function setTheme(theme) {
    html.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
        icon.classList.add("bi-toggle-on");
        icon.classList.remove("bi-toggle-off");
    } else {
        icon.classList.add("bi-toggle-off");
        icon.classList.remove("bi-toggle-on");
    }
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newTheme = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    setTheme(newTheme);
});
//--------------------------------- END toggle and save theme functionality ----------------------------------//
