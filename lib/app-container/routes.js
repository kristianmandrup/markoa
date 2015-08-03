'use strict';
module.exports = {
  init: function (koaApp) {
    this.koaApp = koaApp;
    this.routeCreator = this.koaApp.route.creator(this.koaApp.app);
    return this;
  },
  add: function(name, config) {
    this.routeCreator.create(name, config);
  }
}
