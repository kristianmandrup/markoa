'use strict';
let path = require('path');
let page = require('./page');

module.exports = {
  Mounter: require('./mounter'),
  page: page,
  resolver: require('./resolver'),
  utils: require('../utils'),
  create: function(name, config) {
    return new page.create(name, config);
  }
}
