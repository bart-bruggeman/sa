const DEFAULT_ICON = "bi-dot";

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
    },
    hours: {
        icon: "bi-clock",
        render: v => {
            const values = Array.isArray(v) ? v : [v];
            return values.map(v => `${v}`).join('<br>'); 
        }
    },
    info: {
        icon: "bi-info-circle",
        render: v => v
    }
};

const sectionsData = [healthcareData, realEstateData, wineEstateData];

let filteredSectionsData = null;
