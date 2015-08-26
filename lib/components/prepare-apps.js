var glob = require('glob');
var path = require('path');
function findApps(rootPath, componentsPath, cb) {
  var globExpr = '/[^' + componentsPath +']*';
  glob(rootPath + globExpr, function (er, files) {
    // files is an array of filenames.
    files = files.filter(function(file) { return !file.match(/\./); }).map(function(file) {
      return path.basename(file);
    });
    cb(files);
  });
}

var writer = require('./writer');
module.exports = function(rootPath, options) {
  options = options || {};
  var appsPath = options.appsPath;
  var componentsPath = options.componentsPath || '_global';
  appsPath = appsPath || 'apps';

  var appsDir = path.join(rootPath, appsPath);
  var globalPath = path.join(appsDir, componentsPath, 'compile');

  require(globalPath);

  findApps(appsDir, componentsPath, function(apps) {
    var appsListFile = path.join(appsDir, 'list.json');
    writer.toJsonFile(appsListFile, apps);
    for (var app of apps) {
      var appDir = path.join(appsDir, app, 'compile');
      require(appDir);
    }
  });
}
