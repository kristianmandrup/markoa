/*jslint node: true */
'use strict';
let extend = require('extend');
let utils = require('../../utils');
// returns function which can create marko routes using data dictionary for async fragments
module.exports = function(appContainer) {
  let log = appContainer.log;
  let route = require('./route')(appContainer);
  return function(pageName, config) {
    log('create route', pageName, config);
    let page = config.page;
    let routeName = pageName;

    // Do we want global data to be added only if route is created, or just when mounted?
    // If allow global data merge when mounted, move this to AppContainer.mounter.config ?

    // update global data of appContainer with contribution from this app
    extend(true, appContainer.data.$global, page.data.$global);
    // TODO: make util for this!
    log('global data:', utils.log.obj(appContainer.data.$global));
    route(routeName, config);
  };
};
