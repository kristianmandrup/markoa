'use strict';
module.exports = function(app, opts) {
  opts = opts || {};
  let options = opts.static;
  if (!(options && options.dir)) {
    throw 'Missing static: in options for static mw';
  }
  let serve = require('koa-static');
  app.use(serve(options.dir));
}
