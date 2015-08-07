'use strict';

module.exports = function(name, config) {
  let Resolver = require('../resolver');
  let State = require('./state');
  let Template = require('./template');

  let resolved = new Resolver(name, config);
  return {
    state: new State(resolved),
    template: new Template(resolved),
    resolved: resolved
  }
}
