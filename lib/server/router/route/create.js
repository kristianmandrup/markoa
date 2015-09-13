/*jslint node: true */
'use strict';

let extend = require('extend');
let addRoute = require('./add');

function getTemplateData(appContainer, data) {
  return extend({}, appContainer.data.page || {}, data || {});
}

module.exports = function(opts) {
  let routeName = opts.routeName;
  let config = opts.config;
  let Render = opts.appContainer.Render || require('../../render');

  if (routeName === opts.config.defaultRoute) {
    routeName = '';
  }
  let router = opts.serverApp.router;
  // console.log('Koa router', router);

  let options = {
    router: router,
    app :opts.app,
    appContainer: opts.appContainer,
    renderPage: new Render(routeName, config),
    templateData: opts.options.templateData || getTemplateData,
    pageName: routeName,
    routePath: `/${routeName}`
  };
  // console.log('route options', options);
  addRoute(options);
};
