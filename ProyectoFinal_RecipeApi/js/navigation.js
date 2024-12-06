const NavigationFactory = (function () {
  const htmlElements = {
    navLinks: () => document.querySelectorAll(".btn[data-page]"),
  };

  const handlers = {
    navigate(event) {
      event.preventDefault();
      const targetPage = event.target.getAttribute("data-page");
      if (targetPage) {
        window.location.href = targetPage;
      } else {
        console.error("Enlace no válido o falta el atributo data-page");
      }
    },
  };

  const bindEvents = () => {
    htmlElements.navLinks().forEach((link) => {
      link.addEventListener("click", handlers.navigate);
    });
  };

  const init = () => {
    console.log("Navegación inicializada...");
    bindEvents();
  };

  return {
    htmlElements,
    handlers,
    bindEvents,
    init,
  };
})();

export default NavigationFactory;
