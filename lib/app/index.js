'use strict';
let path = require('path');
let Page = require('./page');

module.exports = function(name, config) {
  return new Page(name, config);
}
