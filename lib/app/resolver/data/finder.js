/*jslint node: true */
'use strict';
let path = require('path');
let utils = require('../../../utils');
let projectConf = require('../../../config').project;

module.exports = function(name, config, key) {
  let appsPath = path.resolve(config.rootPath, 'apps');

  function findAppData(appName) {
    appName = appName || name;
    try {
      let appDataPath = path.join(appsPath, appName, projectConf.app.data.folder);
      return utils.data.retrieve(appDataPath);
    } catch (e) {
      return false;
    }
  }

  // TODO: Extract for reuse
  function findInheritedData() {
    try {
      var meta = utils.meta(appsPath);
      var appName = meta.data ? meta.data.app : (meta.app || meta.inherit);
      return findAppData(appName);
    } catch (e) {
      return false;
    }
  }

  var find = function() {
    try {
      var data = findAppData() || findInheritedData();
      // assumes a data.js file or data/index.js file
      // with Object of the form
      // {page: {...}, $global: {...}}
      data = key === 'page' ? data[key] || data : data[key];
      if (!data) {
        console.warn('WARNING: page data is empty.\nIf you expected to have page data, please check:\n' + appDataPath);
        return {};
      } else {
        return data;
      }
    } catch (e) {
      console.warn('WARNING: page data could not be loaded. Please check your page data script file for syntax errors:\n' + appDataPath);
      return {};
    }
  }
  return find;
}
