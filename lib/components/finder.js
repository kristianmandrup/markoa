var path = require('path');

function componentMapFile(compPath) {
  return path.join(compPath, 'components-map.json');
}

function loadFile(compPath) {
  try {
    var fullPath = componentMapFile(compPath);
    return require(fullPath) || {};
  } catch(e) {
    return {};
  }
}

function widgetsMap(compPath) {
  try {
    return loadFile(compPath)['widgets'];
  } catch(e) {
    return {};
  }
}

module.exports = function(registryPaths) {
  globalWidgetsMap = widgetsMap(registryPaths.globalPath);
  localWidgetsMap = widgetsMap(registryPaths.localPath);

  return function(tagName) {
    return localWidgetsMap[tagName] || globalWidgetsMap[tagName];
  }
}
