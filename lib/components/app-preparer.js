var path = require('path');
var tagParser = require('./tag-parser');
var browserWidgets = require('./browser-widgets');
var writer = require('./writer');

module.exports = function(rootPath) {
  return function() {
    var appName = 'index';
    var appPath = path.join(rootPath, 'page');
    var page = path.join(appPath, appName + '.marko');

    var globalComponentsPath = path.resolve(path.join(rootPath, '../', '_global', 'components'));
    var widgetMapLocations = {
      globalPath: globalComponentsPath,
      localPath: path.join(rootPath, 'components')
    };

    var parse = tagParser(widgetMapLocations);
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
