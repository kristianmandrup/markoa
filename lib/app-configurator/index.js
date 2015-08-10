'use strict';
let path = require('path');

function globalState(rootPath) {
  try {
    return require(path.join(rootPath, 'apps/_global/state')) || {};
  } catch (e) {
    return {};
  }
}

// new appContainer.configurator(appContainer, {rootPath :__dirname, apps: ['account', 'projects']})
module.exports = function(appContainer, opts) {
  opts = opts || {};
  let rootPath = opts.rootPath;
  let appList = opts.apps;

  if (typeof appContainer.apps !== 'object')
    throw 'AppConfigurator constructor missing AppContainer';

  if (!rootPath) {
    throw 'AppConfigMounter missing rootPath';
  }

  appContainer = appContainer || createAppContainer();

  globalState = opts.globalState || globalState;
  appContainer.state.$global = (typeof globalState === 'function') ? globalState(rootPath) : globalState;

  let configurator = {
    appContainer: appContainer,
    appList: appList || [],
    rootPath: rootPath,
    App: opts.App || require('../app'),
    // you can override this default appConfig strategy in your app if needed
    mountApps: function(list) {
      this.appContainer.mount.configs(this.appConfig.configs(list))
      return this;
    }
  };
  configurator.appConfig = require('./app-config')(configurator)
  return configurator;
}
