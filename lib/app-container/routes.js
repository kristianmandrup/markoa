'use strict';
module.exports = function (appContainer) {
  let koaApp = appContainer.koaApp;
  if (!koaApp) throw 'AppContainer::Routes must take an AppContainer with a KoaApp configured';
  console.log('koaApp', koaApp);
  let Router = koaApp.Router;
  return {
    appContainer: appContainer,
    koaApp: koaApp,
    routeCreator: new Router(appContainer, koaApp.app),

    // registry of routes to SPAs added
    routes: [],
    add: function(name, config) {
      if (!config) throw `routes.add missing config for ${name}`;
      if (!this.routeCreator.create(name, config)) return;
      this.routes.push(name);
    }
  }
}
