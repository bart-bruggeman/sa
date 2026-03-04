//------------------------------------------ BEGIN section content -------------------------------------------//
function createSections(sections) {
    const container = document.getElementById("section-container");
    const fragment = document.createDocumentFragment();

    // Helper: maak link <li> en bind click om pane te openen
    const createLinkItem = (link, category = "", subcategory = "") => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#"; 
        a.textContent = link.text;

        a.addEventListener("click", (e) => {
            e.preventDefault();

            // Vul de offcanvas
            document.getElementById("paneCategory").textContent = category || "-";
            document.getElementById("paneSubcategory").textContent = subcategory || "-";
            document.getElementById("paneName").textContent = link.text;

            // Website
            const websiteEl = document.getElementById("paneWebsite");
            const websiteText = websiteEl.querySelector(".text");
            if (link.url && link.url !== "-") {
                websiteText.innerHTML = `<a href="${link.url}" target="_blank">${link.url}</a>`;
                websiteEl.style.display = "block";
            } else {
                websiteEl.style.display = "none";
            }

            // Address
            const addressEl = document.getElementById("paneAddress");
            const addressText = addressEl.querySelector(".text");
            if (link.address && link.address !== "-") {
                addressText.textContent = link.address;
                addressEl.style.display = "block";
            } else {
                addressEl.style.display = "none";
            }

            // Phone
            const phoneEl = document.getElementById("panePhone");
            const phoneText = phoneEl.querySelector(".text");
            if (link.phone && link.phone !== "-") {
                phoneText.textContent = link.phone;
                phoneEl.style.display = "block";
            } else {
                phoneEl.style.display = "none";
            }

            // Email
            const mailEl = document.getElementById("paneMail");
            const mailText = mailEl.querySelector(".text");
            if (link.mail && link.mail !== "-") {
                mailText.textContent = link.mail;
                mailEl.style.display = "block";
            } else {
                mailEl.style.display = "none";
            }

            // Open de offcanvas
            const offcanvasEl = document.getElementById('linkPane');
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            bsOffcanvas.show();
        });

        li.appendChild(a);
        return li;
    };

    // Helper: maak <ul> met links
    const createLinkList = (links, category = "", subcategory = "", extraClass = "") => {
        const ul = document.createElement("ul");
        ul.className = `list-unstyled mb-0 ${extraClass}`.trim();
        links?.forEach(link => ul.appendChild(createLinkItem(link, category, subcategory)));
        return ul;
    };

    sections.forEach(section => {
        const sectionEl = document.createElement("section");
        sectionEl.className = "mb-3 border-bottom";

        // Header
        const header = document.createElement("h2");
        header.className = "h5 mb-3 d-flex justify-content-between align-items-center";
        header.textContent = section.category;

        const chevron = document.createElement("i");
        chevron.className = "bi bi-chevron-down";
        header.appendChild(chevron);
        sectionEl.appendChild(header);

        // CASE 1: met subcategories
        if (section.subcategories) {
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
        }
        // CASE 2: zonder subcategories
        else if (section.links) {
            sectionEl.appendChild(createLinkList(section.links, section.category, ""));
        }

        fragment.appendChild(sectionEl);
    });

    container.appendChild(fragment);
}
//------------------------------------------- END section content --------------------------------------------//

//--------------------------------------- BEGIN section functionality ----------------------------------------//
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
//---------------------------------------- END section functionality -----------------------------------------//

//-------------------------------- BEGIN toggle and save theme functionality ---------------------------------//
const toggleBtn = document.getElementById("themeToggleLink");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    html.setAttribute("data-bs-theme", savedTheme);
    const icon = toggleBtn.querySelector("i");
    icon.classList.toggle(savedTheme === "dark" ? "bi-toggle-on" : "bi-toggle-off");
    icon.classList.toggle(savedTheme === "dark" ? "bi-toggle-off" : "bi-toggle-on");
}

toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newTheme = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggleBtn.querySelector("i").classList.toggle("bi-toggle-on");
    toggleBtn.querySelector("i").classList.toggle("bi-toggle-off");
});
//--------------------------------- END toggle and save theme functionality ----------------------------------//