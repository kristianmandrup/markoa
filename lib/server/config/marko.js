'use strict';
let marko = require('marko');
var path = require('path');
var chokidar = require('chokidar');
var reloader = require('marko/hot-reload');
var markoRequire = require('marko/node-require');
markoRequire.install();

function watchViews(viewsDir) {
  let ignorePattern = /[\/\\]\./;
  // ignored: ignorePattern
  let watchOptions = {persistent: true, ignore: ignorePattern};
  // watcher
  //   .on('add', function(path) { log('File', path, 'has been added'); })
  //   .on('change', function(path) { log('File', path, 'has been changed'); })

  function fileChangeHandler(filePath, stats) {
    stats = stats || {};
    if (/\.marko$/.test(filePath)) {
      var time = stats.mtime || new Date();
      console.log('Marko file change detected:' + time);
      // Resolve the filename to a full template path:
      var templatePath = filePath;
      console.log('Marko template modified: ', templatePath);
      // Pass along the *full* template path to marko
      reloader.enable();
      reloader.handleFileModified(templatePath);
    }
  }

  // One-liner for current directory, ignores .dotfiles
  var watcher = chokidar.watch(viewsDir, watchOptions);
  watcher.on('change', fileChangeHandler);
}

module.exports = function(options) {
  if (process.env.NODE_ENV !== 'production') {
    // Enable hot reloading in development
    if (!options.views) {
      throw 'Missing views: option for Marko HOT RELOAD configuration';
    }
    let views = options.views;
    for (let key of Object.keys(views)) {
      let viewsDir = views[key];
      console.log(`Watching: .marko templates in ${viewsDir} for hot reload!!`);
      watchViews(viewsDir);
    }
  }
}
