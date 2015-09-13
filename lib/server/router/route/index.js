/*jslint node: true */
'use strict';

var path = require('path');
let create = require('./create');

function templateFinder(page, config) {
  if (typeof page === 'function') {
    return page;
  }
  return function() {
    return config.app.Template(config.app.resolved, page);
  }
}


module.exports = function(appContainer) {
  let serverApp = appContainer.koaApp.app;

  return {
    drawRoutes: function(routeName, routesObj, config) {
      let keys = Object.keys(routesObj);
      console.log('Draw routes', keys);
      for (let key of keys) {
        let page = routesObj[key];
        if (key === '.') {
          key = '';
        }
        if (page === '.') {
          page = 'app';
        }

        let findTemplate = templateFinder(page, config);
        let routePath = path.join(routeName, key);
        let app = config.app;

        create({
          methods: ['get'],
          routeName: routePath,
          app: app,
          options: {},
          config: config,
          findTemplate: findTemplate,
          serverApp: serverApp,
          appContainer: appContainer
        });
      }

    },

    forApp: function(routeName, config, opts) {
      console.log('=====================');
      console.log('    APP ROUTES');
      console.log('=====================');

      // index is the default route unless configured to be otherwise...
      config.defaultRoute = config.defaultRoute || 'index';
      opts = opts || {};
      let app = config.app;
      create({
        methods: app.obj.methods,
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
      console.log('---------------------');
      console.log('    SUB ROUTES');
      console.log('---------------------');

      opts = opts || {};
      let subApps = config.app.apps.sub();
      let subAppNames = Object.keys(subApps);
      console.log('sub apps:', subAppNames.join(', '));
      for (var appName of subAppNames) {
        console.log('create routes for:', appName);
        var routeName = path.join(parent.name, appName);
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
