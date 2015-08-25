'use strict';
let extend = require('extend');

function templateData(appContainer, state) {
  return extend({}, appContainer.state.page || {}, state || {})
}

module.exports = function(appContainer) {
  return function(routeName, config, opts) {
    // index is the default route unless configured to be otherwise...
    config.defaultRoute = config.defaultRoute || 'index';
    opts = opts || {};
    let app = appContainer.koaApp.app;
    let page = config.page;
    let Render = appContainer.Render || require('../render');
    let renderPage = new Render(routeName, config);
    templateData = opts.templateData || templateData;
    let log = appContainer.log;
    let pageName = routeName;

    if (routeName === config.defaultRoute)
      routeName = '';
    let routePath = `/${routeName}`;

    log(`route ${routePath} : ${pageName}`);

    app.router.get(routePath, function*(next) {
      // TODO: cache it!
      let pageState = page.state.page();
      if (typeof pageState === 'string') {
        // console.log('pageState', pageState);
        pageState = require(pageState);
      }
      log('page state', pageState);
      let data = templateData(appContainer, pageState);
      log('template data', data);

      let context = this;
      data.$global = appContainer.state.$global || {};
      // data.request = context.request;
      renderPage(this, pageName, data);
      yield next;
    });
    return routeName;
  }
}
