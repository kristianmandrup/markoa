/*jslint node: true */
'use strict';

module.exports = function(name, config) {
  let DataResolver = require('./data');
  let TemplateResolver = require('./template');
  let PagesResolver = require('./pages');

  let pagesResolver = new PagesResolver(name, config);
  let dataResolver = new DataResolver(name, config);
  let templateResolver = new TemplateResolver(name, config);
  return {
    pages: pagesResolver('pages'),
    data: {
      // TODO: should be 'app'
      page: dataResolver('page'),
      $global: dataResolver('$global')
    },
    template: templateResolver('template')
  };
};
