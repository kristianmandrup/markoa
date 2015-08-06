'use strict';

let extend = require('extend');
// returns function which can create marko routes using data dictionary for async fragments
module.exports = function(appContainer, app) {
  return {
    create: function(pageName, config) {
      appContainer.log('create route', pageName, config);
      let page = config.page;
      let routeName = pageName;

      // update global state of appContainer with contribution from this app
      extend(true, appContainer.state.$global, page.state.$global);
      appContainer.log('global state:', appContainer.state.$global);

      let self = this;
      let Render = require('./render');
      let renderPage = new Render(routeName, config);

      app.get(`/${routeName}`, function*() {
        // TODO: cache it!
        let pageState = page.state.page();
        if (typeof pageState === 'string') {
          pageState = require(pageState);
        }
        appContainer.log('page state', pageState);
        let templateData = self.templateData(pageState);
        appContainer.log('template data', templateData);

        let context = this;
        templateData.$global = appContainer.state.$global;
        templateData.request = context.request;
        renderPage(this, routeName, templateData);
      });
    },
    templateData: function(state) {
      // true,
      return extend({}, appContainer.state.page, state)
    }
  }
}
