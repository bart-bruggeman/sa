//-------------------------------- CONFIG --------------------------------//

const DEFAULT_ICON = "bi-dot";

const fieldConfig = {
    address:{
        icon:"bi-geo-alt",
        render:v =>`<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    coordinates:{
        icon:"bi-geo",
        render:v =>`<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank">${v}</a>`
    },
    email:{
        icon:"bi-envelope",
        render:v =>`<a href="mailto:${v}">${v}</a>`
    },
    phone:{
        icon:"bi-telephone",
        render:v =>`<a href="tel:${v.replace(/\s+/g,'')}">${v}</a>`
    },
    phone_emergency:{
        icon:"bi-telephone-plus-fill",
        colorClass:"emergency",
        render:v =>`<a href="tel:${v.replace(/\s+/g,'')}" class="emergency">${v}</a>`
    },
    url:{
        icon:"bi-globe",
        render:v =>`<a href="${v}" target="_blank">${v}</a>`
    },
    hours:{
        icon:"bi-clock",
        render:v =>v
    },
    info:{
        icon:"bi-info-circle",
        render:v =>v
    }
};

const sectionsData=[healthcareData,realEstateData,wineEstateData];

//-------------------------------- FIELD HTML --------------------------------//

function renderFields(data) {
    let html="";
    for(const [key,val] of Object.entries(data)) {
        if(!val || key==="name" || key==="items") continue;
        const cfg=fieldConfig[key] || {icon:DEFAULT_ICON,render:v =>v};
        const color=cfg.colorClass || "";
        html+=`<p><span class="value ${color}"><i class="bi ${cfg.icon} icon ${color}"></i>${cfg.render(val)}</span></p>`;
    }
    return html;
}

//-------------------------------- OFFICE BLOCK --------------------------------//

function officeBlockHTML(office,showName=true) {
    let html=`<div class="office-block mb-4">`;
    if(showName && office.name) {
        html+=`<p><strong>${office.name}</strong></p><hr>`;
    }
    html+=renderFields(office);
    html+=`</div>`;
    return html;
}

//-------------------------------- OFFCANVAS --------------------------------//

function renderOffcanvas(link) {
    const pane=document.getElementById("linkPane");
    const body=pane.querySelector(".offcanvas-body");
    let html=`<div class="office-top mb-3"><p><strong>${link.name}</strong></p><hr></div>`;
    html+=officeBlockHTML(link,false);
    if(link.items) {
        link.items.forEach(branch => {
            html+=officeBlockHTML(branch,true);
        });
    }
    body.innerHTML=html;
    bootstrap.Offcanvas.getOrCreateInstance(pane).show();
}

//-------------------------------- LINKS --------------------------------//

function linkListHTML(links,sectionIndex,subIndex) {
    let html=`<ul class="list-unstyled mb-0">`;
    links.forEach((l,i) => {
        html+=`<li><a href="#" data-s="${sectionIndex}" data-c="${subIndex}" data-i="${i}">${l.name}</a></li>`;
    });
    html+=`</ul>`;
    return html;
}

//-------------------------------- SUBCATEGORY RENDER --------------------------------//

function renderSubcategories(sectionIndex) {
    const section=sectionsData[sectionIndex];
    let html="";
    if(section.items) {
        let rowOpen=false;
        section.items.forEach((sub,i) => {
            if(i%4===0) {
                if(rowOpen) html+=`</div>`;
                html+=`<div class="row g-4">`;
                rowOpen=true;
            }
            html+=`<div class="col-12 col-md-6 col-lg-3">`;
            html+=`<h3 class="h6 mb-2 subcategory-title">${sub.label}</h3>`;
            html+=linkListHTML(sub.items,sectionIndex,i);
            html+=`</div>`;
        });
       if(rowOpen) html+=`</div>`;
    } else if(section.links) {
        html+=linkListHTML(section.links,sectionIndex,-1);
    }
    return html;
}

//-------------------------------- SECTIONS --------------------------------//

function renderSections() {
    const container=document.getElementById("section-container");
    let html="";
    sectionsData.forEach((section,i) => {
        html+=`
            <section class="mb-3 border-bottom" data-section="${i}">
                <h2 class="h5 mb-3 d-flex justify-content-between align-items-center">
                    ${section.label}
                    <i class="bi bi-chevron-down"></i>
                </h2>
                <div class="section-content" style="display:none"></div>
            </section>
        `;
    });
    container.innerHTML=html;
}

//-------------------------------- EVENTS --------------------------------//

function initEvents() {
    const container=document.getElementById("section-container");
    container.addEventListener("click",e => {
        // links
        const link=e.target.closest("a[data-i]");
        if(link) {
            e.preventDefault();
            const s=link.dataset.s;
            const c=link.dataset.c;
            const i=link.dataset.i;
            const section=sectionsData[s];
            let item;
            if(c>=0) {
                item=section.items[c].items[i];
            } else {
                item=section.links[i];
            }
            renderOffcanvas(item);
            return;
        }
        // sections
        const sectionEl=e.target.closest("section");
        if(!sectionEl || e.target.closest("a")) return;
        const isOpen=sectionEl.classList.contains("open");
        document.querySelectorAll("#section-container section").forEach(sec => {
            sec.classList.remove("open");
            const cont=sec.querySelector(".section-content");
            cont.style.display="none";
        });
        if(!isOpen) {
            sectionEl.classList.add("open");
            const idx=sectionEl.dataset.section;
            const content=sectionEl.querySelector(".section-content");
            if(!content.dataset.loaded) {
                content.innerHTML=renderSubcategories(idx);
                content.dataset.loaded=true;
            }
            content.style.display="block";
        }
    });
}

//-------------------------------- THEME --------------------------------//

function initTheme() {
    const btn=document.getElementById("themeToggleLink");
    const html=document.documentElement;
    const icon=btn.querySelector("i");
    function setTheme(t) {
        html.dataset.bsTheme=t;
        localStorage.setItem("theme",t);
        icon.classList.toggle("bi-toggle-on",t==="dark");
        icon.classList.toggle("bi-toggle-off",t!=="dark");
    }
    setTheme(localStorage.getItem("theme") || "light");
    btn.addEventListener("click",e => {
        e.preventDefault();
        setTheme(html.dataset.bsTheme==="dark"?"light":"dark");
    });
}

//-------------------------------- INIT --------------------------------//

document.addEventListener("DOMContentLoaded",() => {
    renderSections();
    initEvents();
    initTheme();
});