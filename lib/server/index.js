'use strict';
let config = require('./config')
let koa = require('koa')
let KoaConfig = config.Koa;
let markoConfig = config.marko;

module.exports = function(opts, koaApp) {
  koaApp = koaApp || koa();
  return {
    app: koaApp,
    Router: opts.Router || require('./router'),
    config: config,
    init: function (cb) {
      this.koaServer = this.koaConfig(koaApp, opts).init(function(mw) {
        cb(mw);
      });
      return this;
    },
    minimal: function () {
      return this.koaConfig().minimal();
    },
    koaConfig: function() {
      return new KoaConfig(koaApp, opts);
    }
  }
}
