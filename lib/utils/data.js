/*jslint node: true */
'use strict';
let fs = require('fs');
let file = require('./file');

let dataUtil = {
  // TODO: enable retrieval dependant on current process.ENV, such as test data, production data etc.
  // process.env.NODE_ENV
  forEnv: function(data, env) {
    env = env || process.env.NODE_ENV;
    return data[env] || data['default'] || data;
  },
  retrieve: function(path) {
    try {
      if (!file.existsSync(path)) {
        console.warn('WARN: No file found at ' + path);
        return false;
      }
      // console.log('retrieve data for', path);
      let data = require(path) || {};
      // console.log('data', data);
      let resolveddata = dataUtil.forEnv(data);
      // console.log('resolveddata', resolveddata);
      return resolveddata;
    } catch (e) {
      // console.error(e);
      console.warn('ERROR: could not retrieve data at ' + path);
      console.warn('Most likely an error in your code there that generates the JSON!!');
      return false;
    }
  }
}

module.exports = dataUtil;
