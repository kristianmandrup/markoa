'use strict';
let AppContainer = require('../');

function createAppContainer(koaApp) {
  return new AppContainer(koaApp).start()
}

module.exports = function(koaApp, appContainer, opts) {
  opts = opts || {};
  let rootPath = opts.root;
  let appList = opts.apps;
  if (!rootPath) {
    throw 'AppConfigMounter missing rootPath';
  }
  let mounter = {
    appContainer: appContainer || createAppContainer(koaApp),
    appList: appList || [],
    rootPath: rootPath,
    page: opts.page || require('../../app').page,
    // you can override this default appConfig strategy in your app if needed
    mountApps: function(list) {
      this.appContainer.mount.configs(this.app.configs(list))
      return mounter;
    },
    createRoutes: function() {
      this.appContainer.createRoutes();
    }
  };
  mounter.app = require('./app')(mounter)
  return mounter;
}
