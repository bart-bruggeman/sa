const DEFAULT_ICON = "";

const makeArray = v => Array.isArray(v) ? v : [v];

const iconMap = {
    address: {
        icon: "bi-geo-alt",
        render: v => makeArray(v)
            .map(item => `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item)}" target="_blank">${item}</a>`)
            .join("<br>")
    },
    coordinates: {
        icon: "bi-geo",
        render: v => makeArray(v)
            .map(item => `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item)}" target="_blank">${item}</a>`)
            .join("<br>")
    },
    email: {
        icon: "bi-envelope",
        render: v => makeArray(v)
            .map(item => `<a href="mailto:${item}">${item}</a>`)
            .join("<br>")
    },
    hours: {
        icon: "bi-clock",
        render: item => makeArray(item).join("<br>")
    },
    info: {
        icon: "bi-info-circle",
        render: item => makeArray(item).join("<br>")
    },
    phone: {
        icon: "bi-telephone",
        render: v => makeArray(v)
            .map(item => `<a href="tel:${item.replace(/\s+/g, '')}">${item}</a>`)
            .join("<br>")
    },
    phone_emergency: {
        icon: "bi-telephone-fill",
        colorClass: "emergency",
        render: v => makeArray(v)
            .map(item => `<a href="tel:${item.replace(/\s+/g, '')}" class="emergency">${item} (emergency)</a>`)
            .join("<br>")
    },
    url: {
        icon: "bi-globe",
        render: v => makeArray(v)
            .map(item => `<a href="${item}" target="_blank">${item}</a>`)
            .join("<br>")
    }
};