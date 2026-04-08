function initTheme() {
    const btn = document.getElementById("theme-id");
    const html = document.documentElement;
    const icon = btn.querySelector("i");

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    btn.addEventListener("click", e => {
        e.preventDefault();
        setTheme(html.dataset.bsTheme === "dark" ? "light" : "dark");
    });

    function setTheme(theme) {
        html.dataset.bsTheme = theme;
        localStorage.setItem("theme", theme);
        icon.classList.toggle("bi-toggle-on", theme === "dark");
        icon.classList.toggle("bi-toggle-off", theme !== "dark");
    }
}