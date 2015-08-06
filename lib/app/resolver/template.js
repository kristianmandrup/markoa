'use strict';
let base = require('./base');
let extend = require('extend');
let path = require('path');

module.exports = function(name, config, key) {
  key = key || 'template';
  return extend(base(name, config, key), {
    find: function() {
      let appsPath = path.resolve(config.rootPath, 'apps');
      let pagePath = path.join(appsPath, name, 'page');
      let pageTemplateName = name + '.marko';
      return path.join(pagePath, pageTemplateName);
    }
  });
}
