'use strict';
let AppContainer = require('../');

module.exports = function(koaApp, rootPath, appList) {
  return {
    appContainer: new AppContainer(koaApp).start(),
    appList: appList || [],
    rootPath: rootPath,
    page: require('../../app').page,
    // you can override this default appConfig strategy in your app if needed
    app: require('./app')(this),
    mountApps: function(list) {
      this.appContainer.mount.configs(this.app.configs(list))
    }
  };
}
