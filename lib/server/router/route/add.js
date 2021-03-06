/*jslint node: true */
'use strict';
let utils = require('../../../utils');
let rest = require('./rest');

module.exports = function(opts) {

  // console.log('addRoute', opts);
  // console.log('GET:', opts.routePath);
  // console.log('APP', opts.app);
  // console.log('DATA:', utils.log.obj(opts.app.data));
  // console.log('OBJ', opts.app.obj);

  if (opts.methods) {
    rest.restRoutes(opts.router, opts.routePath, rest.restOnly(opts.methods));
  }

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
    let renderOptions = {
      name: opts.pageName,
      data: data,
      findTemplate: opts.findTemplate
    }
    // data.request = context.request;
    opts.renderPage(context, renderOptions);
    yield next;
  });
};
