var glob = require('glob');
var path = require('path');
function findApps(rootPath, cb) {
  glob(rootPath + '/[^_global]*', function (er, files) {
    // files is an array of filenames.
    files = files.filter(function(file) { return !file.match(/\./); }).map(function(file) {
      return path.basename(file);
    });
    cb(files);
  });
}

module.exports = function(rootPath, appsPath) {
  appsPath = appsPath || 'apps';

  var appsDir = path.join(rootPath, 'apps');
  var globalPath = path.join(appsDir, '_global', 'compile');
  require(globalPath);
  findApps(appsDir, function(apps) {
    for (var app of apps) {
      var appDir = path.join(appsDir, app, 'compile');
      require(appDir);
    }
  });
}
