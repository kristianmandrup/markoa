'use strict';
let render = require('./render');
// returns function which can create marko routes using data dictionary for async fragments
module.exports = {
  creator: function(app) {
    return {
      create: function(pageName, config) {
        let renderPage = render.factory(pageName, config);
        let routeName = pageName;
        app.get(`/${routeName}`, function*() {
          let context = this;
          let templateData = config.state; // improve!
          templateData.request = context.request;
          renderPage(this, pageName, templateData);
        });
      }
    }
  }
}
