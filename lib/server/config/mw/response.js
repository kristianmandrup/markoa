'use strict';
module.exports = function(app, options) {
  let compress = require('koa-compress');
  app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
  }));
};
