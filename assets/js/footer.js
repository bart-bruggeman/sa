function renderFooter() {
    renderEmergencyPhonesFooter();
    //renderGeographyFooter();
}

function renderEmergencyPhonesFooter() {
    const emergencyPhonesContainer = document.getElementById("emergency-phones-footer-id");
    if (!emergencyPhonesContainer) return;
    let html = '<div class="row">';
    emergencyData.forEach(group => {
        html += `<div class="col-md-3 col-6 mb-1">`;
        html += `<h5>${group.name}</h5>`;
        html += `<ul class="list-unstyled">`;
        group.items.forEach(item => {
            html += `<li class="d-flex align-items-center">`;
            html += `<a href="tel:${item.phone.replace(/\s+/g,'')}" class="link-footer emergency d-flex align-items-center">`;
            html += `<i class="bi bi-telephone-fill fs-5 me-1"></i>${item.phone}`;
            html += `</a>`;
            if (item.comment) {
                html += `<span class="ms-1">${item.comment}</span>`;
            }
            html += `</li>`;
        });
        html += `</ul></div>`;
    });
    html += `</div>`;
    emergencyPhonesContainer.innerHTML = html;
}

function renderGeographyFooter() {
    const geographyContainer = document.getElementById("geography-footer-id");
    if (!geographyContainer) return;
    let html = `<div class="row">`;
    html += `<p>`;
    if (Array.isArray(geographicData.towns) && geographicData.towns.length > 0) {
        html += `Towns: ${geographicData.towns.join(', ')} | `;
    }
    html += `Region: ${geographicData.region} | `;
    html += `Metropolitan Municipality: ${geographicData.municipality} | `;
    html += `Province: ${geographicData.province}`;
    html += ``;
    if (Array.isArray(geographicData.suburbs) && geographicData.suburbs.length > 0) {
        html += `<br/>Gordon's Bay Suburbs: ${geographicData.suburbs.join(', ')}</p>`;
    }
    html += `</div>`;
    geographyContainer.innerHTML = html;
}
