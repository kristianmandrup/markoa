'use strict';
let render = require('./render');
// returns function which can create marko routes using data dictionary for async fragments
module.exports = function(appContainer, app) {
  return {
    create: function(pageName, config) {
      let renderPage = render.factory(pageName, config);
      let routeName = pageName;

      let templateData = this.templateData(config.page.state);
      // update global state of appContainer with contribution from this app
      extend(true, appContainer.state.$global, config.page.state.$global);

      app.get(`/${routeName}`, function*() {
        let context = this;
        templateData.request = context.request;
        yield renderPage(this, pageName, templateData);
      });
      return pageName;
    },
    templateData: function(state) {
      extend(true, {}, appContainer.state, state)
    }
  }
}
