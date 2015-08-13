var fs = require('fs');
var async = require('async');

// General function
var dive = function (dir, action) {
  // Assert that it's a function
  if (typeof action !== 'function')
    action = function (error, file) { };
  // Read the directory
  fs.readdir(dir, function (err, list) {
    // Return the error if something went wrong
    if (err)
      return action(err);

    // For every file in the list
    list.forEach(function (file) {
      // Full path of that file
      path = dir + "/" + file;
      // Get the file's stats
      fs.stat(path, function (err, stat) {
        console.log(stat);
        // If the file is a directory
        if (stat && stat.isDirectory())
          // Dive into the directory
          dive(path, action);
        else
          // Call the action
          action(null, path);
      });
    });
  });
};

function finder(list, expr, fun) {
  list = list || [];
  return function(err, file) {
    console.log('file', file);
    var basename = path.basename(file);
    if (basename.match(expr)) {
      console.log('matches', expr, basename);
      list[basename] = file;
    }
  }
}

module.exports = function(componentPath, callback) {
  if (!componentPath) {
    throw 'Components finder must be created with a component path, was:' + componentPath;
  }
  var components = {
    tags: [],
    widgets: [],
    all: undefined
  }

  function find(type) {
    components.all = components.all || extend({}, components['tags'], components['widgets']);
    return components[type] ||  ;
  }

  async.parallel([
      function(){
        dive(componentPath, finder(component.widgets, /widget/, findWidget))
      },
      function(){
        dive(componentPath, finder(component.tags, /renderer/, findTag))
      }
  ], callback(find));
}
