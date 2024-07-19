const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });

    // Listen for changes to the URL
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    // Check the initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);

      let pageElement = null;

      switch (route) {
        case "/":
          pageElement = document.createElement("h1");
          pageElement.textContent = "Home";
          break;
        case "/order":
          pageElement = document.createElement("h1");
          pageElement.textContent = "Your order";
          break;
        case "/menu":
          pageElement = document.createElement("h1");
          pageElement.textContent = "Menu";
          break;
        default:
          if (route.startsWith("/product/")) {
            pageElement = document.createElement("h1");
            pageElement.textContent = "Details";
            const paramId = route.substring(route.lastIndexof("/") + 1);
            pageElement.dataset.id = paramId;
          }
      }

      if (pageElement) {
        const cache = document.querySelector("main");
        cache.innerHTML = "";
        cache.appendChild(pageElement);
        window.scrollX = 0;
        window.scrollY = 0;
      }
    }
  },
};

export default Router;
