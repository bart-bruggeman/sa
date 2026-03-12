//-------------------------------- FIELD CONFIG --------------------------------//

const fieldConfig = {
    address: {
        icon: "bi-geo-alt",
        render: v => `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    coordinates: {
        icon: "bi-geo",
        render: v => `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    email: {
        icon: "bi-envelope",
        render: v => `<a href="mailto:${v}">${v}</a>`
    },
    phone: {
        icon: "bi-telephone",
        render: v => `<a href="tel:${v.replace(/\s+/g,'')}">${v}</a>`
    },
    phone_emergency: {
        icon: "bi-telephone-plus-fill",
        colorClass: "emergency",
        render: v => `<a href="tel:${v.replace(/\s+/g,'')}" class="emergency">${v}</a>`
    },
    url: {
        icon: "bi-globe",
        render: v => `<a href="${v}" target="_blank">${v}</a>`
    },
    hours: { icon: "bi-clock", render: v => v },
    info: { icon: "bi-info-circle", render: v => v }
};

const DEFAULT_ICON = "bi-dot";

const sectionsData = [
    healthcareData,
    realEstateData,
    wineEstateData
];

//-------------------------------- UTIL --------------------------------//

function createEl(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
}

//-------------------------------- FIELD RENDER --------------------------------//

function renderFields(data) {
    const frag = document.createDocumentFragment();

    Object.entries(data).forEach(([key,value]) => {
        if (!value || key === "name" || key === "items") return;
        
        const config = fieldConfig[key] || { icon: DEFAULT_ICON, render:v=>v };
        const colorClass = config.colorClass || "";
        const p = createEl("p");
        
        p.innerHTML = `
            <span class="value ${colorClass}">
                <i class="bi ${config.icon} icon ${colorClass}"></i>
                ${config.render(value)}
            </span>
        `;
        
        frag.appendChild(p);
    });

    return frag;
}

//-------------------------------- OFFICE BLOCK --------------------------------//

function createOfficeBlock(office, showName=true) {
    const div = createEl("div","office-block mb-4");
    
    if(showName && office.name) {
        const title = createEl("p");
        title.innerHTML = `<strong>${office.name}</strong>`;
        div.append(title,createEl("hr"));
    }

    div.appendChild(renderFields(office));
    
    return div;
}

//-------------------------------- OFFCANVAS --------------------------------//

function renderOffcanvas(link) {
    const offcanvasEl = document.getElementById("linkPane");
    const body = offcanvasEl.querySelector(".offcanvas-body");
    const frag = document.createDocumentFragment();
    const top = createEl("div","office-top mb-3");
    const name = createEl("p");

    body.innerHTML="";
    name.innerHTML=`<strong>${link.name}</strong>`;
    top.append(name,createEl("hr"));
    frag.appendChild(top);
    frag.appendChild(createOfficeBlock(link,false));
    
    if(link.items?.length) {
        link.items.forEach(branch=>{
            frag.appendChild(createOfficeBlock(branch,true));
        });
    }
    
    body.appendChild(frag);
    
    bootstrap.Offcanvas
        .getOrCreateInstance(offcanvasEl)
        .show();
}

//-------------------------------- LINK LIST --------------------------------//

function createLinkList(links) {
    const frag = document.createDocumentFragment();
    const ul = createEl("ul","list-unstyled mb-0");

    ul._links = links;
    links.forEach((link,i)=>{
        const li = createEl("li");
        const a = createEl("a");
        
        a.href="#";
        a.textContent = link.name;
        a.dataset.index = i;
        
        li.appendChild(a);
        frag.appendChild(li);
    });

    ul.appendChild(frag);
    
    return ul;
}

//-------------------------------- SECTIONS --------------------------------//

function createSections(sections) {
    const container = document.getElementById("section-container");
    const frag = document.createDocumentFragment();
    
    sections.forEach(section=>{
        const sectionEl = createEl("section","mb-3 border-bottom");
        const header = createEl(
            "h2",
            "h5 mb-3 d-flex justify-content-between align-items-center"
        );
    
        header.innerHTML=`
            ${section.label}
            <i class="bi bi-chevron-down"></i>
        `;
        
        sectionEl.appendChild(header);
        
        const content = createEl("div","section-content");
        content.style.display="none";
        
        if(section.items) {
            const wrapper = createEl("div","subcategories-wrapper");
        
            let row;
            section.items.forEach((subcat,i)=>{
                if(i % 4 === 0) {
                    row = createEl("div","row g-4");
                    wrapper.appendChild(row);
                }

                const col = createEl("div","col-12 col-md-6 col-lg-3");
                const title = createEl("h3","h6 mb-2 subcategory-title");
                title.textContent = subcat.label;
                col.append(title,createLinkList(subcat.items));
                row.appendChild(col);
            });

            content.appendChild(wrapper);
        } else if(section.links) {
            content.appendChild(createLinkList(section.links));
        }

        sectionEl.append(content);
        frag.appendChild(sectionEl);
    });

    container.appendChild(frag);
}

//-------------------------------- EVENTS --------------------------------//

function initEvents() {
    const container = document.getElementById("section-container");
    
    container.addEventListener("click",e=>{
        const link = e.target.closest("a[data-index]");
    
        if(link) {
            e.preventDefault();
            const ul = link.closest("ul");
            const links = ul._links;
            renderOffcanvas(links[link.dataset.index]);
            return;
        }
    
        const section = e.target.closest("section");
    
        if(!section) return;
    
        const isOpen = section.classList.contains("open");
    
        document.querySelectorAll("#section-container section")
        .forEach(s=>{
            s.classList.remove("open");
            const c = s.querySelector(".section-content");
            if(c) c.style.display="none";
        });
    
        if(!isOpen) {
            section.classList.add("open");
            section.querySelector(".section-content").style.display="block";
        }
    });
}

//-------------------------------- THEME --------------------------------//

function initTheme() {
    const btn = document.getElementById("themeToggleLink");
    const html = document.documentElement;
    const icon = btn.querySelector("i");
    const setTheme = theme=>{
        html.dataset.bsTheme = theme;
        localStorage.setItem("theme",theme);
        icon.classList.toggle("bi-toggle-on",theme==="dark");
        icon.classList.toggle("bi-toggle-off",theme!=="dark");
    };
    
    setTheme(localStorage.getItem("theme") || "light");
    
    btn.addEventListener("click",e=>{
        e.preventDefault();
        setTheme(
            html.dataset.bsTheme==="dark" ? "light":"dark"
        );
    });
}

//-------------------------------- INIT --------------------------------//

document.addEventListener("DOMContentLoaded",()=>{
    createSections(sectionsData);
    initEvents();
    initTheme();
});
