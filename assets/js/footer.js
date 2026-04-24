function renderFooter() {
    const emergencyPhonesContainer = document.getElementById("emergency-phones-footer-id");
    if (!emergencyPhonesContainer) return;
    let html = '<div class="row">';
    emergencyData.forEach(group => {
        html += `<div class="col-md-3 col-6 mb-1">`;
        html += `<h5>${group.name}</h5>`;
        html += `<ul class="list-unstyled">`;
        const phones = Array.isArray(group.phone) ? group.phone : [group.phone];
        phones.forEach(item => {
            const match = item.match(/^([^\(]+)(\((.*)\))?$/);
            const numberPart = match ? match[1].trim() : item;
            const extraPart = match && match[3] ? match[3] : "";
            const cleanNumber = numberPart.replace(/\s+/g, '');
            html += `<li class="d-flex align-items-center">`;
            html += `
                <a href="tel:${cleanNumber}" class="link-footer emergency d-flex align-items-center">
                    <i class="bi bi-telephone-fill fs-5 me-1"></i>
                    ${numberPart}
                </a>
            `;
            if (extraPart) {
                html += `<span class="ms-1">(${extraPart})</span>`;
            }
            html += `</li>`;
        });
        html += `</ul></div>`;
    });
    html += `</div>`;
    emergencyPhonesContainer.innerHTML = html;
}