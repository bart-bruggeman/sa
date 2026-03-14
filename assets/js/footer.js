function renderFooter() {
    renderFooterEmergency();
    renderFooterGeography();

    function renderFooterEmergency() {
        const container = document.getElementById("emergencyPhones");
        if (!container) return;
        let html = '<div class="row">';
        emergencyData.forEach(group => {
            html += `<div class="col-md-3 col-6 mb-1">`;
            html += `<h5>${group.label}</h5>`;
            html += `<ul class="list-unstyled">`;
            group.items.forEach(item => {
                html += `<li>`;
                html += `<a href="tel:${item.phone.replace(/\s+/g,'')}" class="d-flex align-items-center link-footer emergency">`;
                html += `<i class="bi bi-telephone fs-5 me-1"></i>${item.phone}</a>`;
                if (item.comment) html += ` ${item.comment}`;
                html += `</li>`;
            });
            html += `</ul></div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }

    function renderFooterGeography() {
        const container = document.getElementById("footerGeography");
        if (!container) return;
        let html = `<div class="row">`;
        html += `<p>`;
        html += `Town/Place: ${geographicData.town} | `;
        html += `Region/Area: ${geographicData.region} | `;
        html += `City: ${geographicData.city} | `;
        html += `Province: ${geographicData.province}`;
        html += `</p>`;
        if (Array.isArray(geographicData.suburbs) && geographicData.suburbs.length > 0) {
            html += `<p>Suburbs: ${geographicData.suburbs.join(', ')}</p>`;
        }
        html += `</div>`;
        container.innerHTML = html;
    }

}
