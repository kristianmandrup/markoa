/*jslint node: true */
'use strict';

var projectConf = require('../../config').project;
var path = require('path');

function appObj(config, name) {
  try {
    let appPath = path.join(config.rootPath, projectConf.apps.folder, name);
    return require(appPath);
  } catch (e) {
    return {};
  }
}

module.exports = function(name, config) {
  let Resolver = require('../resolver');
  let Data = require('./data');
  let Apps = require('./apps');
  let Template = require('./template');
  let assetsPath = path.join(name, projectConf.app.assets.folder);
  let componentsPath = path.join(name, projectConf.app.components.folder);

  let resolved = new Resolver(name, config);
  return {
    obj: appObj(config, name),
    data: new Data(resolved),
    Template: Template,
    findTemplate: new Template(resolved),
    apps: new Apps(resolved), // Nested sub apps
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
