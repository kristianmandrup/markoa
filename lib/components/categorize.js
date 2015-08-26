var path = require('path');
var categorizer = require('./categorizer');
var writer = require('./writer');
var appPreparer = require('./app-preparer');

module.exports = function(rootPath, options) {
  options = options || {};
  options.components = options.components || {};
  options.componentsPath = options.componentsPath || options.components.localPath || 'components';
  var componentsPath = path.join(rootPath, options.componentsPath);
  var next = options.next;
  if (options.type === 'app')
    next = appPreparer(rootPath, options);
  categorizer(componentsPath, function(finder) {
    var compsListPath = path.join(componentsPath, 'components-map.json');
    writer.toJsonFile(compsListPath, finder(), next);
  });
}
