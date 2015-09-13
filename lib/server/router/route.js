/*jslint node: true */
'use strict';
let extend = require('extend');

function getTemplateData(appContainer, data) {
  return extend({}, appContainer.data.page || {}, data || {});
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
    var templateData = opts.templateData || getTemplateData;
    let log = appContainer.log;
    let pageName = routeName;

    if (routeName === config.defaultRoute) {
      routeName = '';
    }
    let routePath = `/${routeName}`;

    log(`route ${routePath} :`, pageName || '');

    app.router.get(routePath, function*(next) {
      // TODO: cache it!
      let pageData = page.data.page();
      if (typeof pageData === 'string') {
        // console.log('pageState', pageState);
        pageData = require(pageData);
      }
      log('page data', pageData);
      let data = templateData(appContainer, pageData);
      log('template data', data);

      let context = this;
      data.$global = appContainer.data.$global || {};
      // data.request = context.request;
      renderPage(context, pageName, data);
      yield next;
    });
    return routeName;
  };
};
