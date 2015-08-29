'use strict';

var projectConf = require('../config').project;

module.exports = function(name, config) {
  let Resolver = require('../resolver');
  let State = require('./state');
  let Template = require('./template');

  let resolved = new Resolver(name, config);
  return {
    state: new State(resolved),
    template: new Template(resolved),
    assets: {
      path: path.join(name, projectConf.app.assets.folder)
    },
    resolved: resolved
  }
}
