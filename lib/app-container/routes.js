/*jslint node: true */
'use strict';

module.exports = function (appContainer) {
  let koaApp = appContainer.koaApp;
  if (!koaApp) {
    throw 'appContainer.Routes must take an AppContainer with a KoaApp configured';
  }
  let Router = koaApp.Router;
  return {
    appContainer: appContainer,
    koaApp: koaApp,
    Route: new Router(appContainer),
    // registry of routes to SPAs added
    routes: [],
    add: function(name, config) {
      try {
        if (!config) {
          throw `Routes.add missing config for ${name}`;
        }
        let route = new this.Route(name, config);
        this.routes.push(route);
      } catch (e) {
        console.error('ERROR', e);
        console.error('ERROR: Unable to add routes for:', name, config);
      }
    }
  };
};
