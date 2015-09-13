/*jslint node: true */
'use strict';
let base = require('../base');
let extend = require('extend');
let finder = require('./finder');

module.exports = function(name, config) {
  return function(key) {
    key = key || 'apps';
    return extend(base(name, config, key), finder(name, config));
  };
};
