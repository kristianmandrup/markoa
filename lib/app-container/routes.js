'use strict';
module.exports = function (appContainer) {
  let koaApp = appContainer.koaApp;
  return {
    appContainer: appContainer,
    koaApp: koaApp,
    routeCreator: new koaApp.Router(appContainer, koaApp.app),

    // registry of routes to SPAs added
    routes: [],
    add: function(name, config) {
      if (!this.routeCreator.create(name, config)) return;
      this.routes.push(name);
    }
  }
}
