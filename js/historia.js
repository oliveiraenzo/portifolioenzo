/* ==========================================================
   Minha História - theme toggle (persisted)
   ========================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  function apply(theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    btn.setAttribute("aria-pressed", String(theme === "light"));
  }
  apply(root.getAttribute("data-theme") === "light" ? "light" : "dark");
  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();