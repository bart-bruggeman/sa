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
        render: v => {
            const values = Array.isArray(v) ? v : [v];
            return values
                .map(e => `<a href="mailto:${e}">${e}</a>`)
                .join("<br>");
        }
    },
    phone: {
        icon: "bi-telephone",
        render: v => {
            const values = Array.isArray(v) ? v : [v];
            return values
                .map(num => `<a href="tel:${num.replace(/\s+/g, '')}">${num}</a>`)
                .join("<br>");
        }
    },
    phone_emergency: {
        icon: "bi-telephone-fill",
        colorClass: "emergency",
        render: v => {
            const values = Array.isArray(v) ? v : [v];
            return values
                .map(num => `<a href="tel:${num.replace(/\s+/g, '')}" class="emergency">${num} (emergency)</a>`)
                .join("<br>");
        }
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
        render: v => {
            const values = Array.isArray(v) ? v : [v];
            return values.join("<br>");
        }
    }
};
