/*jslint node: true */
'use strict';

var path = require('path');
var tagParser = require('./tag-parser');
var browserWidgets = require('./browser-widgets');
var writer = require('./writer');
let projectConf = require('../config').project;
/*
* Options can be used to overriden default components/tags locations
*
* options = {
*   components: {
*     globalPath: 'my/global/components',
*     localPath: 'localTags'
* }
*/
module.exports = function(rootPath, options) {
  options = options || {};
  options.components = options.components || {};

  let localComponentsFolder = projectConf.app.components.folder;
  let relativeGlobalComponentsPath = path.join(projectConf.apps.global.folder,
    localComponentsFolder);

  options.components.globalPath = options.components.globalPath || relativeGlobalComponentsPath;
  options.components.localPath = options.components.localPath || localComponentsFolder;

  return function() {
    var globalComponentsPath = path.resolve(
      path.join(rootPath, '../', options.components.globalPath));

    var widgetMapLocations = {
      globalPath: globalComponentsPath,
      localPath: path.join(rootPath, options.components.localPath)
    };

    var parse = tagParser(widgetMapLocations);

    var appName = options.appName || 'index';
    if (!appName) {
      return;
    }
    var appPath = path.join(rootPath, 'page');
    var page = path.join(appPath, appName + '.marko');
    if (!page) {
      return;
    }

    var assetsFolder = 'assets'; // TODO: use projectConf

    parse(page, function(registry) {
      var widgetsFilePath = path.join(appPath, assetsFolder, 'widgets.json');
      var widgets = [];
      for(var key in registry) {
          widgets.push(registry[key]);
      }

      function createBrowserFile() {
        browserWidgets.merge(appPath, appName);
      }
      writer.toJsonFile(widgetsFilePath, widgets, createBrowserFile);
    });
  };
};
