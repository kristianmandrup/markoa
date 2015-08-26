var path = require('path');
var categorizer = require('./categorizer');
var writer = require('./writer');
var appPreparer = require('./app-preparer');

module.exports = function(rootPath, options) {
  options = options || {};

  if (typeof rootPath !== 'string') {
    throw "components..categorize 1st argument 'rootPath' must be a String, a path pointing to root of component location to categorize";
  }

  if (typeof options !== 'object') {
    throw "components.categorize 2nd argument 'options' must be an Object.\nUse {type: 'app'} to ensure application compilation.\nUse {components: {localPath: '...', globalPath: '...' } } to customize component paths";
  }

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
