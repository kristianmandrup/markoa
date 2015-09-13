/*jslint node: true */
'use strict';
let path = require('path');
let utils = require('../../../utils');

module.exports = function(name, config) {
  let appsPath = path.resolve(config.rootPath, 'apps');
  let appPath = path.join(appsPath, name);

  function findSubApps(appName) {
    appName = appName || name;
    let subAppsPath = path.join(appsPath, appName, 'apps');
    try {
      console.log('subAppsPath', subAppsPath);
      if (utils.file.existsSync(subAppsPath)) {
        console.log('load', subAppsPath);
        return require(subAppsPath);
      } else {
        return false;
      }
    } catch (e) {
      console.warn('WARNING: No sub-apps in ' + subAppsPath);
      return false;
    }
  }

  // Sould recursively resolve each page via App and Page constructors.
  // A sub page can be an indepenedent app, or it can inherit from the main app
  function find() {
    var apps = findSubApps();
    if (!apps) {
      console.warn('WARNING: Apps for ' + appPath+ ' could not be found!');
    } else {
      console.log('found apps:', utils.log.obj(apps));
    }
    return apps;
  }

  return {find: find};
};
