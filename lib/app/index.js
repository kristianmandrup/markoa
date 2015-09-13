/*jslint node: true */
'use strict';
let Page = require('./page');

module.exports = function(name, config) {
  console.log('-- App --', name, config);
  return new Page(name, config);
};
