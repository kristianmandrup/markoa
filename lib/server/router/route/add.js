/*jslint node: true */
'use strict';
module.exports = function(opts) {
  console.log('addRoute', opts);
  opts.router.get(opts.routePath, function*(next) {
    // TODO: cache it!
    let appData = opts.app.data.page();
    if (typeof appData === 'string') {
      // console.log('pageState', pageState);
      appData = require(appData);
    }
    console.log('app data', appData);
    let data = opts.templateData(opts.appContainer, appData);
    console.log('template data', data);

    let context = this;
    data.$global = opts.appContainer.data.$global || {};
    // data.request = context.request;
    opts.renderPage(context, opts.pageName, data);
    yield next;
  });
};
