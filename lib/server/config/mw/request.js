'use strict';
module.exports = function(app, options) {
  let bodyParser = require('koa-body-parser');
  app.use(bodyParser());
}
