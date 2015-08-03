'use strict';
let path = require('path');

function mountPath(root) {
  return path.join(root, '../');
}

function config(root, state) {
  return {
    rootPath: mountPath(root),
    state: state || {}
  };
}

module.exports = {
  mountPath: mountPath,
  config: config,
  mounter: require('./mounter'),
  utils: require('../utils')
}
