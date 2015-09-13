/*jslint node: true */
'use strict';

module.exports = function(name, config) {
  let DataResolver = require('./data');
  let TemplateResolver = require('./template');
  let AppsResolver = require('./apps');

  let appsResolver = new AppsResolver(name, config);
  let dataResolver = new DataResolver(name, config);
  let templateResolver = new TemplateResolver(name, config);
  return {
    sub: appsResolver('apps'),
    data: {
      // TODO: should be 'app'
      page: dataResolver('page'),
      $global: dataResolver('$global')
    },
    template: templateResolver('template')
  };
};
