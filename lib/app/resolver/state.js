'use strict';
let base = require('./base');
let extend = require('extend');
let path = require('path');

module.exports = function(name, config) {
  return function(key) {
    return extend(base(name, config, key), {
      find: function() {
        let appsPath = path.resolve(config.rootPath, 'apps');
        let statePath = path.join(appsPath, name, 'state');        
        // .resolve
        return require(statePath);
      }
    });
  };
}
