'use strict';
module.exports = function(app, options) {
  let router = require('koa-router');
  app.use(router(app));
};
