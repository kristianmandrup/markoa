'use strict';
let config = require('./config')
let koa = require('koa')

module.exports = function(options, koaApp) {
  koaApp = koaApp || koa();
  return {
    app: koaApp,
    config: config,
    render: require('./render'),
    route: require('./route'),
    init: function (cb) {
      this.koaServer = this.koa(koaApp, options).init(function(mw) {
        cb(mw);
      });
      return this;
    },
    minimal: function () {
      return this.koa().minimal();
    },
    koa: function() {
      return this.config.koa(koaApp, options);
    }
  }
}
