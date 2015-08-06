'use strict';
let State = require('./state');
let Template = require('./template');

let resolver = require('../resolver');

module.exports = {
  State: State,
  Template: Template,
  create: function(name, config) {
    let resolved = resolver.create(name, config);
    return {
      state: new State(resolved),
      template: new Template(resolved),
      resolved: resolved
    }
  }
}
