'use strict';

let State = require('./state');
let Template = require('./template');

module.exports = {
  State: State,
  Template: Template,
  create: function(name, config) {
    return {
      state: new State(name, config, 'state'),
      template: new Template(name, config, 'template')
    }
  }
}
