var extend = require('extend');
var fs = require('fs');
var path = require('path');
var async = require('async');
var dirWalker = require('node-dir');

// General function

function finder(list, expr, cb) {
  return function(err, files) {
    for (var file of files) {
      var basename = path.basename(file);
      var dirs = path.dirname(file).split(path.sep);
      var dir = dirs[dirs.length -1];
      if (basename.match(expr)) {
        list[dir] = file;
      }
    }
    cb(null, files);
  }
}

module.exports = function(componentPath, callback) {
  if (!componentPath) {
    throw 'Components finder must be created with a component path, was:' + componentPath;
  }
  var tags = {};
  var widgets = {};
  var components = {
    tags: tags,
    widgets: widgets,
    all: undefined
  }

  function find() {
    components.all = components.all || extend({}, components['tags'], components['widgets']);
    return components;
  }

  async.parallel([
      function(cb){
        dirWalker.files(componentPath, finder(widgets, /widget/, cb))
      },
      function(cb){
        dirWalker.files(componentPath, finder(tags, /renderer/, cb))
      }
  ], function(err, results) {
    components.tags = tags;
    components.widgets = widgets;
    callback(find);
  });
}
