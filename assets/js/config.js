const DEFAULT_ICON = "";

// --- Helpers ---
const makeArray = v => Array.isArray(v) ? v : (v ? [v] : []);

const firstValid = v => {
    const arr = makeArray(v);
    return arr.length && arr[0] ? arr[0] : null;
};

const isNonEmpty = v =>
    v !== undefined && v !== null && String(v).trim() !== "";

// --- Icon Map ---
const iconMap = {
    address: {
        icon: "bi-geo-alt",
        render: (v, office = {}) => {
            const addressArray = makeArray(v).filter(isNonEmpty);

            // neem eerste geldige coordinate indien aanwezig
            const coords = firstValid(office.coordinates);

            return addressArray
                .map(item => {
                    const query = coords || item;
                    return `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}" target="_blank">${item}</a>`;
                })
                .join("<br>");
        }
    },

    email: {
        icon: "bi-envelope",
        render: v => makeArray(v)
            .filter(isNonEmpty)
            .map(item => `<a href="mailto:${item}">${item}</a>`)
            .join("<br>")
    },

    hours: {
        icon: "bi-clock",
        render: v => makeArray(v)
            .filter(isNonEmpty)
            .join("<br>")
    },

    info: {
        icon: "bi-info-circle",
        render: v => makeArray(v)
            .filter(isNonEmpty)
            .join("<br>")
    },

    phone: {
        icon: "bi-telephone",
        render: v => makeArray(v)
            .filter(isNonEmpty)
            .map(item => {
                const clean = item.replace(/\s+/g, '');
                return `<a href="tel:${clean}">${item}</a>`;
            })
            .join("<br>")
    },

    phone_emergency: {
        icon: "bi-telephone-fill",
        colorClass: "emergency",
        render: v => makeArray(v)
            .filter(isNonEmpty)
            .map(item => {
                const clean = item.replace(/\s+/g, '');
                return `<a href="tel:${clean}" class="emergency">${item} (emergency)</a>`;
            })
            .join("<br>")
    },

    url: {
        icon: "bi-globe",
        render: v => makeArray(v)
            .filter(isNonEmpty)
            .map(item => `<a href="${item}" target="_blank">${item}</a>`)
            .join("<br>")
    }
};