//------------------------------------------ BEGIN section content -------------------------------------------//
function createSections(sections) {
	const container = document.getElementById("section-container");
	const fragment = document.createDocumentFragment();

	// Helper: maak link <li>
	const createLinkItem = (link) => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = link.url;
		a.target = "_blank";
		a.textContent = link.text;
		li.appendChild(a);
		return li;
	};

	// Helper: maak <ul> met links
	const createLinkList = (links, extraClass = "") => {
		const ul = document.createElement("ul");
		ul.className = `list-unstyled mb-0 ${extraClass}`.trim();
		links?.forEach(link => ul.appendChild(createLinkItem(link)));
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
				col.appendChild(createLinkList(subcat.links));
				row.appendChild(col);
			});

			sectionEl.appendChild(wrapper);
		}

		// CASE 2: zonder subcategories
		else if (section.links) {
			sectionEl.appendChild(createLinkList(section.links, "section-content"));
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

	// Verberg alle content containers
	sections.forEach(section => {
		const content = section.querySelector(".section-content");
		if (content) content.style.display = "none";
		section.classList.remove("open");
	});

	let currentlyOpenSection = null;

	sections.forEach(section => {

		section.addEventListener("click", function (event) {

			// Klik op link mag section niet sluiten
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

// Controleer bij laden of er een opgeslagen thema is
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    html.setAttribute("data-bs-theme", savedTheme);
    const icon = toggleBtn.querySelector("i");
    if (savedTheme === "dark") {
        icon.classList.add("bi-toggle-on");
        icon.classList.remove("bi-toggle-off");
    } else {
        icon.classList.add("bi-toggle-off");
        icon.classList.remove("bi-toggle-on");
    }
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