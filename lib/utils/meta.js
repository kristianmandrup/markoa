/*jslint node: true */
'use strict';
var path = require('path');
module.exports = function readMeta(appPath) {
  try {
    let metaPath = path.join(appPath, 'meta');
    return require(metaPath);
  } catch (e) {
    return {};
  }
};
