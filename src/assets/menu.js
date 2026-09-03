/**
 * Menu plegable de la barra superior (solo movil).
 *
 * El panel se colapsa por CSS bajo 780px y unicamente cuando hay JS
 * (la clase `js` la pone el script del <head>). Aqui se alterna el estado,
 * se mantiene aria-expanded sincronizado y se cierra en los casos obvios:
 * al elegir una seccion, con Escape y al volver a ancho de escritorio.
 */
(function () {
  var button = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  if (!button || !menu) return;

  var label = button.querySelector("[data-menu-label]");
  var openLabel = button.querySelector("[data-menu-open-label]");
  var closeLabel = button.querySelector("[data-menu-close-label]");
  var desktop = window.matchMedia("(min-width: 781px)");

  function isOpen() {
    return menu.hasAttribute("data-open");
  }

  function setOpen(open) {
    if (open) menu.setAttribute("data-open", "");
    else menu.removeAttribute("data-open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
    // El texto accesible dice que hara el boton, no en que estado esta.
    if (label && openLabel && closeLabel) {
      button.setAttribute("aria-label", open ? closeLabel.textContent : openLabel.textContent);
    }
  }

  button.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  // Los enlaces son anclas de la misma pagina: si el panel se queda abierto,
  // tapa justo la seccion a la que acabas de saltar.
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a") && isOpen()) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    button.focus();
  });

  var onDesktop = function (event) {
    if (event.matches) setOpen(false);
  };
  if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
  else if (desktop.addListener) desktop.addListener(onDesktop);

  setOpen(false);
})();
