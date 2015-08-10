'use strict';
let base = require('./base');
let extend = require('extend');
let path = require('path');
let utils = require('../../utils');

module.exports = function(name, config) {
  return function(key) {
    return extend(base(name, config, key), {
      find: function() {
        let appsPath = path.resolve(config.rootPath, 'apps');
        let statePath = path.join(appsPath, name, 'state');

        // assumes a state.js file or state/index.js file
        // with Object of the form
        // {page: {...}, $global: {...}}
        try {
          let state = utils.state.retrieve(statePath);
          state = key === 'page' ? state[key] || state : state[key];
          return state || {};
        } catch (e) {
          return {};
        }
      }
    });
  };
}
