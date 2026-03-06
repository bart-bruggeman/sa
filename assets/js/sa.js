//------------------------------------------ BEGIN section content -------------------------------------------//
function createSections(sections) {
    const container = document.getElementById("section-container");
    const fragment = document.createDocumentFragment();

const createLinkItem = (link, category = "", subcategory = "") => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = link.name;

    a.addEventListener("click", (e) => {
        e.preventDefault();

        const offcanvasEl = document.getElementById('linkPane');
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

        const paneNameEl = document.getElementById("paneName");
        if (paneNameEl) paneNameEl.textContent = link.name;

        const offcanvasBody = offcanvasEl.querySelector(".offcanvas-body");

        // Verwijder oude content behalve paneName
        Array.from(offcanvasBody.children).forEach(child => {
            if (!child.id || child.id !== "paneName") {
                child.remove();
            }
        });

        // TOP: naam van het kantoor (hoofdkantoor)
        const topBlock = document.createElement("div");
        topBlock.className = "office-top mb-3";

        const nameTitle = document.createElement("p");
        nameTitle.innerHTML = `<strong>${link.name}</strong>`;
        topBlock.appendChild(nameTitle);

        // scheidingslijn
        const hrTop = document.createElement("hr");
        topBlock.appendChild(hrTop);

        offcanvasBody.appendChild(topBlock);

        // URL van hoofdkantoor
        if (link.url) {
            const pUrl = document.createElement("p");
            pUrl.innerHTML = `<span class="value"><i class="bi bi-globe icon"></i> <a href="${link.url}" target="_blank">${link.url}</a></span>`;
            offcanvasBody.appendChild(pUrl);
        }

        // Helper: office block
        const createOfficeBlock = (office, showName = true) => {
            const div = document.createElement("div");
            div.className = "office-block mb-4"; // meer ruimte tussen blocks

            // Naam van branch tonen indien showName
            if (showName) {
                const typeTitle = document.createElement("p");
                typeTitle.innerHTML = `<strong>${office.name}</strong>`;
                div.appendChild(typeTitle);

                // hr onder branch naam
                const hrBranch = document.createElement("hr");
                div.appendChild(hrBranch);
            }

            // address
            if (office.address) {
                const pAddr = document.createElement("p");
                pAddr.innerHTML = `<span class="value"><i class="bi bi-geo-alt icon"></i> <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}" target="_blank">${office.address}</a></span>`;
                div.appendChild(pAddr);
            }

            // coordinates
            if (office.coordinates) {
                const pCoord = document.createElement("p");
                pCoord.innerHTML = `<span class="value"><i class="bi bi-geo icon"></i> <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.coordinates)}" target="_blank">${office.coordinates}</a></span>`;
                div.appendChild(pCoord);
            }

            // phone
            if (office.phone) {
                const pPhone = document.createElement("p");
                pPhone.innerHTML = `<span class="value"><i class="bi bi-telephone icon"></i> <a href="tel:${office.phone.replace(/\s+/g,'')}">${office.phone}</a></span>`;
                div.appendChild(pPhone);
            }

            // email
            if (office.email) {
                const pMail = document.createElement("p");
                pMail.innerHTML = `<span class="value"><i class="bi bi-envelope icon"></i> <a href="mailto:${office.email}">${office.email}</a></span>`;
                div.appendChild(pMail);
            }

            // info (optioneel)
            if (office.info) {
                const pInfo = document.createElement("p");
                pInfo.innerHTML = `<span class="value"><i class="bi bi-info-circle icon"></i> ${office.info}</span>`;
                div.appendChild(pInfo);
            }

            return div;
        };

        // MAIN OFFICE
        const mainOffice = {
            name: "", // hoofdkantoor geen type-naam tonen
            address: link.address,
            coordinates: link.coordinates,
            phone: link.phone,
            email: link.email
        };
        offcanvasBody.appendChild(createOfficeBlock(mainOffice, false));

        // BRANCHES
        if (link.branches && link.branches.length) {
            link.branches.forEach(branch => {
                offcanvasBody.appendChild(createOfficeBlock(branch, true));
            });
        }

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

            const isOpen = this.classList.contains("open");
            sections.forEach(s => {
                s.classList.remove("open");
                s.querySelector(".section-content") && (s.querySelector(".section-content").style.display = "none");
            });

            if (!isOpen) {
                this.classList.add("open");
                content.style.display = "block";
            }
        });
    });
});
//---------------------------------- END open/close section functionality  -----------------------------------//


//-------------------------------- BEGIN toggle and save theme functionality ---------------------------------//
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
//--------------------------------- END toggle and save theme functionality ----------------------------------//
