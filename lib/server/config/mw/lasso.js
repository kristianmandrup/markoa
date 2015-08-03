'use strict';
module.exports = function(app, opts) {
  opts = opts || {};
  let options = opts.lasso;
  if (!(options && options.file)) {
    throw 'Missing lasso: in options for lasso mw';
  }
  let lasso = require('lasso');
  lasso.configure(options.file);
}
