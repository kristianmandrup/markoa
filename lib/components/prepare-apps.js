/*jslint node: true */
'use strict';

var glob = require('glob');
var path = require('path');
let projectConf = require('../config').project;

function findApps(rootPath, ignoreApp, cb) {
  var globExpr = '/[^' + ignoreApp +']*';
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
  options.components = options.components || {};

  // TODO: use projectConf
  var ignoreApp = options.ignoreApp ||
    options.components.ignoreApp || projectConf.apps.global.folder;

  var containerPath = options.containerPath || options.components.containerPath || '.';

  appsPath = path.join(rootPath, appsPath);
  containerPath = path.join(appsPath, containerPath);
  var compilePath = path.join(containerPath, 'compile');

  require(compilePath);

  findApps(containerPath, ignoreApp, function(apps) {
    var appsListFile = path.join(containerPath, 'list.json');

    if (!apps || apps.length < 1) {
      return;
    }

    writer.toJsonFile(appsListFile, apps);
    for (var app of apps) {
      var appDir = path.join(containerPath, app, 'compile');
      require(appDir);
    }
  });
};
