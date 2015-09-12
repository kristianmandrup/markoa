/*jslint node: true */
'use strict';
let base = require('../base');
let extend = require('extend');
let finder = require('./finder');

module.exports = function(appName, config) {
  return function(key) {
    return extend(base(appName, config, key), finder(appName, config, key));
  };
};
