'use strict';
let marko = require('marko');
var path = require('path');
// var fs = require('fs');
var chokidar = require('chokidar');
var refresher = require('marko/browser-refresh');
var reloader = require('marko/hot-reload');
reloader.enable();

function watchViews(viewsDir) {
  let ignorePattern = /[\/\\]\./;
  // ignored: ignorePattern
  let watchOptions = {persistent: true, ignore: ignorePattern};
  // watcher
  //   .on('add', function(path) { log('File', path, 'has been added'); })
  //   .on('change', function(path) { log('File', path, 'has been changed'); })

  function fileChangeHandler(filename, stats) {
    stats = stats || {};
    if (/\.marko$/.test(filename)) {
      var time = stats.mtime || new Date();
      console.log('Marko file change detected:' + time);
      // Resolve the filename to a full template path:
      var templatePath = path.join(viewsDir, filename);
      console.log('Marko template modified: ', templatePath);
      // Pass along the *full* template path to marko
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
