/*jslint node: true */
'use strict';
let path = require('path');
let utils = require('../../../utils');
let projectConf = require('../../../config').project;

module.exports = function(name, config, key) {
  let appsPath = path.resolve(config.rootPath, 'apps');
  let appPath = path.join(appsPath, name);
  let appDataPath = path.join(appPath, projectConf.app.data.folder);
  let dataEntity = name + ':' + key;

  function findAppData(appName) {
    appName = appName || name;
    try {
      // console.log('findAppData', appName);
      var _appDataPath = path.join(appsPath, appName, projectConf.app.data.folder);
      // console.log('dataPath', _appDataPath);
      return utils.data.retrieve(_appDataPath);
    } catch (e) {
      return false;
    }
  }

  // TODO: Extract for reuse
  function findInheritedData() {
    try {
      // console.log('findInheritedData');
      var meta = utils.meta(appPath);
      // console.log('META', meta);
      var appName = meta.data ? meta.data.app : (meta.app || meta.inherit);
      // console.log('findInheritedData', appName);
      return findAppData(appName);
    } catch (e) {
      return false;
    }
  }

  function find() {
    try {
      // console.log('find: data', key);
      var data = findAppData() || findInheritedData();
      // assumes a data.js file or data/index.js file
      // with Object of the form
      // {page: {...}, $global: {...}}
      // console.log('data', key, data);
      data = key === 'page' ? (data[key] || data) : data[key];
      if (!data) {
        var lines = [
          'WARNING: ' + name + ':' + key + ' data is empty.',
          'If you expected to have page data, please check' + appDataPath
        ];
        console.warn(lines.join('\n'));
        return {};
      } else {
        console.log('data ' + `[${dataEntity}]: ` + utils.log.obj(data));
        return data;
      }
    } catch (e) {
      var lines = [
        'WARNING: page data could not be loaded.',
        'Please check your page data script file for syntax errors:' + appDataPath
      ];
      console.warn(lines.join('\n'));
      return {};
    }
  }
    return {find: find};
};
