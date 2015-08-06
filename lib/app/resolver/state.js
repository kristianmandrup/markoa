'use strict';
let base = require('./base');
let extend = require('extend');
let path = require('path');

module.exports = function(name, config, key) {
  return extend(base(name, config, key), {
    find: function() {
      let appsPath = path.resolve(config.rootPath, 'apps');
      return path.join(appsPath, name, 'state');
    }
  });
}
