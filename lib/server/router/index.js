/*jslint node: true */
'use strict';
let extend = require('extend');
// let utils = require('../../utils');
// returns function which can create marko routes using data dictionary for async fragments
module.exports = function(appContainer) {
  let log = appContainer.log;
  let createRoute = require('./route')(appContainer);

  var router = function(pageName, config) {
    log('create routes for app:', pageName);
    let app = config.app;
    // console.log('routes', app.apps.sub());
    let routeName = pageName;

    let obj = config.app.obj;
    console.log('app routes', pageName, obj.routes);

    // Do we want global data to be added only if route is created, or just when mounted?
    // If allow global data merge when mounted, move this to AppContainer.mounter.config ?

    // update global data of appContainer with contribution from this app
    extend(true, appContainer.data.$global, app.data.$global);
    // TODO: make util for this!
    // log('global data:', utils.log.obj(appContainer.data.$global));
    createRoute.forApp(routeName, config);
    createRoute.forSubApps({app: app, name: routeName}, config);
    createRoute.drawRoutes(routeName, obj.routes, config);
  };

  // must return a nested set of routers, one for each nested sub app
  return router;
};
