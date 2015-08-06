'use strict';
let AppContainer = require('../');

module.exports = function(koaApp, rootPath, appList) {
  let mounter = {
    appContainer: new AppContainer(koaApp).start(),
    appList: appList || [],
    rootPath: rootPath,
    page: require('../../app').page,
    // you can override this default appConfig strategy in your app if needed
    mountApps: function(list) {
      this.appContainer.mount.configs(this.app.configs(list))
    }
  };
  mounter.app = require('./app')(mounter)
  return mounter;
}
