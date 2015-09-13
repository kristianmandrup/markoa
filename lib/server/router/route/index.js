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
      console.log('subApps', subAppNames);
      for (var appName of subAppNames) {
        console.log('create routes for:', appName);
        var routeName = [parent.name, appName].join('/');
        var subApp = subApps[appName];

        subApp.data = subApp.data || parent.data;
        subApp.meta = subApp.meta || parent.meta;

        create({
          routeName: routeName,
          parent: parent,
          app: subApp,
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
