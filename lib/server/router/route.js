'use strict';
let extend = require('extend');

function templateData(appContainer, state) {
  return extend({}, appContainer.state.page || {}, state || {})
}

module.exports = function(appContainer) {
  return function(routeName, config, opts) {
    opts = opts || {};
    let app = appContainer.koaApp.app;
    let page = config.page;
    let Render = appContainer.Render || require('../render');
    let renderPage = new Render(routeName, config);
    templateData = opts.templateData || templateData;
    let log = appContainer.log;


    app.get(`/${routeName}`, function*() {
      // TODO: cache it!
      let pageState = page.state.page();
      if (typeof pageState === 'string') {
        pageState = require(pageState);
      }
      log('page state', pageState);
      let data = templateData(appContainer, pageState);
      log('template data', data);

      let context = this;
      data.$global = appContainer.state.$global || {};
      data.request = context.request;
      renderPage(this, routeName, data);
    });
    return routeName;
  }
}
