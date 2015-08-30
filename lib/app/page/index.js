'use strict';

var projectConf = require('../../config').project;
var path = require('path');

module.exports = function(name, config) {
  let Resolver = require('../resolver');
  let State = require('./state');
  let Template = require('./template');
  let assetsPath = path.join(name, projectConf.app.assets.folder);

  let resolved = new Resolver(name, config);
  return {
    state: new State(resolved),
    template: new Template(resolved),
    assets: {
      path: assetsPath
    },
    resolved: resolved
  }
}
