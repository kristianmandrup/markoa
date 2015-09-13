/*jslint node: true */
'use strict';

let create = require('./create');

module.exports = function(appContainer) {
  let serverApp = appContainer.koaApp.app;

  return {
    forApp: function(routeName, config, opts) {
      // index is the default route unless configured to be otherwise...
      config.defaultRoute = config.defaultRoute || 'index';
      opts = opts || {};
      let app = config.app;

      create({
        routeName: routeName,
        app: app,
        options: opts,
        config: config,
        serverApp: serverApp,
        appContainer: appContainer
      });

      return routeName;
    },
    forSubApps: function(parent, config, opts) {
      opts = opts || {};
      let subApps = config.app.apps.sub();
      let subAppNames = Object.keys(subApps);
      for (var appName of subAppNames) {
        create({
          routeName: appName,
          app: subApps[appName],
          options: opts,
          config: config,
          serverApp: serverApp,
          appContainer: appContainer
        });
      }
      return subAppNames;
    }
  };
};
