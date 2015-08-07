'use strict';

let extend = require('extend');
// returns function which can create marko routes using data dictionary for async fragments
module.exports = function(appContainer) {
  let log = appContainer.log;
  let Route = require('./route')(appContainer);
  return function(pageName, config) {
    log('create route', pageName, config);
    let page = config.page;
    let routeName = pageName;

    // Do we want global state to be added only if route is created, or just when mounted?
    // If allow global state merge when mounted, move this to AppContainer.mounter.config ?

    // update global state of appContainer with contribution from this app
    extend(true, appContainer.state.$global, page.state.$global);
    log('global state:', appContainer.state.$global);
    new Route(routeName, config);
  }
}
