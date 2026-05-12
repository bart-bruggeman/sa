function renderFooter() {
    const emergencyPhonesContainer = document.getElementById("emergency-phones-footer-id");
    if (!emergencyPhonesContainer) return;

    let html = '<div class="row">';

    emergencyData.forEach(group => {
        html += `
            <div class="col-md-3 col-6 pb-1">
                <h5 class="small fw-semibold mb-1 lh-sm">${group.name}</h5>
                <ul class="list-unstyled mb-4">
        `;

        const phones = Array.isArray(group.phone) ? group.phone : [group.phone];

        phones.forEach(item => {
            const match = item.match(/^([^\(]+)(\((.*)\))?$/);

            const numberPart = match ? match[1].trim() : item;
            const extraPart = match && match[3] ? match[3] : "";

            const cleanNumber = numberPart.replace(/\s+/g, '');

            html += `
                <li class="d-flex align-items-center gap-1 mb-1">
                    <a href="tel:${cleanNumber}"
                       class="link-footer emergency-phone d-flex align-items-center text-decoration-none">
                        <i class="bi bi-telephone-fill emergency-phone small me-1"></i>
                        ${numberPart}
                    </a>
            `;

            if (extraPart) {
                html += `
                    <span class="small text-body-secondary text-opacity-75 text-nowrap">
                        (${extraPart})
                    </span>
                `;
            }

            html += `</li>`;
        });

        html += `</ul></div>`;
    });

    html += `</div>`;

    emergencyPhonesContainer.innerHTML = html;
}