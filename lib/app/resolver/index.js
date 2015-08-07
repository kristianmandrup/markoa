'use strict';

module.exports = function(name, config) {
  let StateResolver = require('./state');
  let TemplateResolver = require('./template');

  let stateResolver = new StateResolver(name, config);
  let templateResolver = new TemplateResolver(name, config);
  return {
    state: {
      page: stateResolver('page'),
      $global: stateResolver('$global')
    },
    template: templateResolver('template')
  }
}
