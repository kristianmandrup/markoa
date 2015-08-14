var path = require('path');
var categorizer = require('./categorizer');
var writer = require('./writer');
var appPreparer = require('./app-preparer');

module.exports = function(rootPath, next) {
  var componentsPath = path.join(rootPath, 'components');
  if (next === 'prepare')
    next = appPreparer(rootPath);
  categorizer(componentsPath, function(finder) {
    var compsListPath = path.join(componentsPath, 'components-map.json');
    writer.toJsonFile(compsListPath, finder(), next);
  });
}
