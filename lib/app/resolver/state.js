'use strict';
let base = require('./base');
let extend = require('extend');

module.exports = function(name, config) {
  return extend({
    find: function() {
      let appsPath = path.resolve(config.rootPath, 'apps');
      return path.join(appsPath, name, 'state');
    }
  }, base(name.config));
}
