'use strict';

let StateResolver = require('./state');
let TemplateResolver = require('./template');

module.exports = {
  State: StateResolver,
  Template: TemplateResolver,
  create: function(name, config) {
    let stateResolver = new StateResolver(name, config);
    let templateResolver = new TemplateResolver(name, config);

    return {
      state: {
        page: stateResolver('state'),
        $global: stateResolver('$global')
      },
      template: templateResolver('template')
    }
  }
}
