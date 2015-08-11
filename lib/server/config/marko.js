'use strict';
let marko = require('marko');
var path = require('path');
var fs = require('fs');
var refresher = require('marko/browser-refresh');

function watchViews(viewsDir) {
  //reloader.enable();
  fs.watch(viewsDir, function (event, filename) {
    if (/\.marko$/.test(filename)) {
      // Resolve the filename to a full template path:
      var templatePath = path.join(viewsDir, filename);
      console.log('Marko template modified: ', templatePath);
      // Pass along the *full* template path to marko
      reloader.handleFileModified(templatePath);
    }
  });
}

module.exports = function(options) {
  //refresher.enable();
  if (process.env.NODE_ENV !== 'production') {
    // Enable hot reloading in development
    var reloader = require('marko/hot-reload');
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
