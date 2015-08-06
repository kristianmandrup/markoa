'use strict';
let base = require('./base');
let extend = require('extend');

module.exports = function(name, config) {
  return extend({
    find: function() {
      let appsPath = path.resolve(config.rootPath, 'apps');
      let pagePath = path.join(appsPath, name, 'page');
      let pageTemplateName = name + '.marko';
      return path.join(pagePath, pageTemplateName);
    },
  }, base(name.config));
}
