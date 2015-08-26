var path = require('path');
var tagParser = require('./tag-parser');
var browserWidgets = require('./browser-widgets');
var writer = require('./writer');

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
  options.components.globalPath = options.components.globalPath || '_global/components';
  options.components.localPath = options.components.localPath || 'components';

  return function() {
    var globalComponentsPath = path.resolve(path.join(rootPath, '../', options.components.globalPath));
    var widgetMapLocations = {
      globalPath: globalComponentsPath,
      localPath: path.join(rootPath, options.components.localPath)
    };

    var parse = tagParser(widgetMapLocations);

    var appName = options.appName || 'index';
    if (!appName) return;
    var appPath = path.join(rootPath, 'page');
    var page = path.join(appPath, appName + '.marko');
    if (!page) return;

    parse(page, function(registry) {
      var widgetsFilePath = path.join(appPath, 'widgets.json');
      var widgets = [];
      for(var key in registry) {
          widgets.push(registry[key]);
      }

      function createBrowserFile() {
        browserWidgets.merge(appPath, appName)
      }
      writer.toJsonFile(widgetsFilePath, widgets, createBrowserFile);
    })
  }
}
