/**
 * Modo claro / oscuro.
 *
 * El tema inicial ya lo fijo el script inline del <head> (evita el destello).
 * Aqui solo se conecta el boton: alterna, guarda la eleccion en localStorage
 * y mantiene el texto y el estado accesible sincronizados.
 */
(function () {
  var root = document.documentElement;
  var button = document.querySelector("[data-theme-toggle]");
  if (!button) return;

  var label = button.querySelector("[data-theme-label]");
  var toDark = button.querySelector("[data-theme-to-dark]");
  var toLight = button.querySelector("[data-theme-to-light]");

  function isDark() {
    return root.getAttribute("data-theme") === "dark";
  }

  function sync() {
    var dark = isDark();
    button.setAttribute("aria-pressed", dark ? "true" : "false");
    // El boton dice a que tema lleva, no en cual estas.
    if (label && toDark && toLight) {
      label.textContent = dark ? toLight.textContent : toDark.textContent;
    }
  }

  button.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    sync();
  });

  // Si el visitante nunca eligio, seguir al sistema cuando cambie.
  if (window.matchMedia) {
    var query = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (event) {
      var chosen = null;
      try {
        chosen = localStorage.getItem("theme");
      } catch (e) {}
      if (chosen) return;
      root.setAttribute("data-theme", event.matches ? "dark" : "light");
      sync();
    };
    if (query.addEventListener) query.addEventListener("change", onChange);
    else if (query.addListener) query.addListener(onChange);
  }

  sync();
})();
