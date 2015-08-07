'use strict';

// new appContainer.configurator(appContainer, {rootPath :__dirname, apps: ['account', 'projects']})
module.exports = function(appContainer, opts) {
  opts = opts || {};
  let rootPath = opts.rootPath;
  let appList = opts.apps;

  if (typeof appContainer.apps !== 'object') throw 'AppConfigurator constructor missing AppContainer';

  if (!rootPath) {
    throw 'AppConfigMounter missing rootPath';
  }

  let configurator = {
    appContainer: appContainer || createAppContainer(),
    appList: appList || [],
    rootPath: rootPath,
    App: opts.app || require('../app'),
    // you can override this default appConfig strategy in your app if needed
    mountApps: function(list) {
      this.appContainer.mount.configs(this.appConfig.configs(list))
      return this;
    }
  };
  configurator.appConfig = require('./app-config')(configurator)
  return configurator;
}
