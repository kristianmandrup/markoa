'use strict';

module.exports = function(name, config) {
  let DataResolver = require('./data');
  let TemplateResolver = require('./template');

  let dataResolver = new DataResolver(name, config);
  let templateResolver = new TemplateResolver(name, config);
  return {
    data: {
      // TODO: should be 'app'
      page: dataResolver('page'),
      $global: dataResolver('$global')
    },
    template: templateResolver('template')
  };
};
