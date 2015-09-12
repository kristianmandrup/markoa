'use strict';

var projectConf = require('../../config').project;
var path = require('path');

module.exports = function(name, config) {
  let Resolver = require('../resolver');
  let Data = require('./data');
  let Template = require('./template');
  let assetsPath = path.join(name, projectConf.app.assets.folder);
  let componentsPath = path.join(name, projectConf.app.components.folder);

  let resolved = new Resolver(name, config);
  return {
    data: new Data(resolved),
    template: new Template(resolved),
    assets: {
      path: assetsPath
    },
    components: {
      path: componentsPath,
      widgets: {
        path: path.join(componentsPath, 'widgets')
      },
      tags: {
        path: path.join(componentsPath, 'tags')
      }
    },
    resolved: resolved
  };
};
