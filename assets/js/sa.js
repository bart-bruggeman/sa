//------------------------------------------ BEGIN section content -------------------------------------------//
function createSections(sections) {
	const container = document.getElementById("section-container");

	sections.forEach(section => {

		// Section element
		const sectionEl = document.createElement("section");
		sectionEl.className = "mb-3 border-bottom";

		// Header met categorie en chevron
		const header = document.createElement("h2");
		header.className = "h5 mb-3 d-flex justify-content-between align-items-center";
		header.textContent = section.category;

		const chevron = document.createElement("i");
		chevron.className = "bi bi-chevron-down";
		header.appendChild(chevron);

		sectionEl.appendChild(header);

		//------------------------------------------
		// CASE 1: section met subcategories
		//------------------------------------------
		if (section.subcategories) {

			const wrapper = document.createElement("div");
			wrapper.className = "subcategories-wrapper section-content"; // toggle werkt op section-content

			let row;

			section.subcategories.forEach((subcat, index) => {

				// Maak nieuwe row bij start of elke 4 items
				if (index % 4 === 0) {
					row = document.createElement("div");
					row.className = "row g-4";
					wrapper.appendChild(row);
				}

				const col = document.createElement("div");
				col.className = "col-12 col-md-6 col-lg-3";

				// Subcategorie titel
				const subTitle = document.createElement("h3");
				subTitle.className = "h6 mb-2 subcategory-title";
				subTitle.textContent = subcat.subcategory;
				col.appendChild(subTitle);

				// Links lijst
				const ul = document.createElement("ul");
				ul.className = "list-unstyled mb-0";

				if (subcat.links && subcat.links.length > 0) {
					subcat.links.forEach(link => {
						const li = document.createElement("li");

						if (link.status) {
							const badge = document.createElement("span");
							badge.className = "badge ms-2";
							li.appendChild(badge);
						}

						const a = document.createElement("a");
						a.href = link.url;
						a.target = "_blank";
						a.textContent = link.text;

						if (link.period) a.setAttribute("data-period", link.period);
						if (link.status) a.setAttribute("data-status", link.status);

						li.appendChild(a);

						if (link.info) {
							const infoIcon = document.createElement("i");
							infoIcon.className = "bi bi-info-circle-fill text-secondary ms-2";
							infoIcon.setAttribute("tabindex", "0");
							infoIcon.setAttribute("role", "button");
							infoIcon.setAttribute("title", link.info);
							infoIcon.setAttribute("data-bs-toggle", "tooltip");
							infoIcon.setAttribute("data-bs-placement", "right");
							li.appendChild(infoIcon);
						}

						ul.appendChild(li);
					});
				}

				col.appendChild(ul);
				row.appendChild(col);
			});

			sectionEl.appendChild(wrapper);
		}

		//------------------------------------------
		// CASE 2: gewone categorie zonder subcat
		//------------------------------------------
		else if (section.links) {

			const ul = document.createElement("ul");
			ul.className = "list-unstyled mb-0 section-content";

			section.links.forEach(link => {
				const li = document.createElement("li");

				if (link.status) {
					const badge = document.createElement("span");
					badge.className = "badge ms-2";
					li.appendChild(badge);
				}

				const a = document.createElement("a");
				a.href = link.url;
				a.target = "_blank";
				a.textContent = link.text;

				if (link.period) a.setAttribute("data-period", link.period);
				if (link.status) a.setAttribute("data-status", link.status);

				li.appendChild(a);

				if (link.info) {
					const infoIcon = document.createElement("i");
					infoIcon.className = "bi bi-info-circle-fill text-secondary ms-2";
					infoIcon.setAttribute("tabindex", "0");
					infoIcon.setAttribute("role", "button");
					infoIcon.setAttribute("title", link.info);
					infoIcon.setAttribute("data-bs-toggle", "tooltip");
					infoIcon.setAttribute("data-bs-placement", "right");
					li.appendChild(infoIcon);
				}

				ul.appendChild(li);
			});

			sectionEl.appendChild(ul);
		}

		container.appendChild(sectionEl);
	});

	// Bootstrap tooltips initialiseren
	const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.forEach(tooltipTriggerEl => {
		new bootstrap.Tooltip(tooltipTriggerEl);
	});
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


//---------------------------------------- BEGIN badge functionality -----------------------------------------//
document.addEventListener("DOMContentLoaded", function () {
	const statusConfig = {
		todo: { class: "bg-danger", text: "Open" },
		onhold: { class: "bg-secondary", text: "On hold" },
		busy: { class: "bg-warning", text: "Busy" },
		investigated: { class: "bg-light", text: "Investigated" },
		developed: { class: "bg-success", text: "Developed" },
		deployed: { class: "bg-primary", text: "Deployed" },
		solved: { class: "bg-dark", text: "Closed" },
		closed: { class: "bg-dark", text: "Closed" }
	};

	document.querySelectorAll("li").forEach(li => {
		const a = li.querySelector("a");
		const badge = li.querySelector(".badge");

		if (!a || !badge) return;

		const status = (a.getAttribute("data-status") || "").toLowerCase();

		if (statusConfig[status]) {
			const { class: badgeClass, text } = statusConfig[status];
			badge.classList.add("badge", badgeClass, "ms-2");
			badge.textContent = text;
		} else {
			badge.remove();
		}
	});
});
//----------------------------------------- END badge functionality ------------------------------------------//


//-------------------------------- BEGIN toggle and save theme functionality ---------------------------------//
const toggleBtn = document.getElementById("themeToggleLink");
const html = document.documentElement

toggleBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const current = html.getAttribute("data-bs-theme");
	html.setAttribute("data-bs-theme", current === "dark" ? "light" : "dark");
	const icon = toggleBtn.querySelector("i");
	icon.classList.toggle("bi-toggle-on");
	icon.classList.toggle("bi-toggle-off");
});
//--------------------------------- END toggle and save theme functionality ----------------------------------//