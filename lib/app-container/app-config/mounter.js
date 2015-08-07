'use strict';
let AppContainer = require('../');

function createAppContainer() {
  return new AppContainer();
}

module.exports = function(appContainer, opts) {
  opts = opts || {};
  let rootPath = opts.root;
  let appList = opts.apps;
  if (!rootPath) {
    throw 'AppConfigMounter missing rootPath';
  }
  let mounter = {
    appContainer: appContainer || createAppContainer(),
    appList: appList || [],
    rootPath: rootPath,
    page: opts.page || require('../../app').page,
    // you can override this default appConfig strategy in your app if needed
    mountApps: function(list) {
      this.appContainer.mount.configs(this.app.configs(list))
      return mounter;
    },
    createRoutes: function(koaApp) {
      this.appContainer.createRoutes();
    }
  };
  mounter.app = require('./app')(mounter)
  return mounter;
}
