'use strict';
let path = require('path');
let utils = require('../utils');
let AppContainer = require('../app-container');

function globalState(rootPath) {
  return utils.state.retrieve(path.join(rootPath, 'apps', '_global', 'state'));
}

function createAppContainer(opts) {
  return new AppContainer(opts);
}

// new AppConfigurator({container: appContainer, rootPath :__dirname, apps: ['account', 'projects']})
module.exports = function(opts) {
  opts = opts || {};
  let rootPath = opts.rootPath;
  let appList = opts.apps;
  let appContainer = opts.container;

  if (appContainer && typeof appContainer.apps !== 'object')
    throw 'AppConfigurator constructor missing AppContainer';

  if (!rootPath) {
    throw 'AppConfig.Mounter missing rootPath';
  }

  appContainer = appContainer || createAppContainer(opts);

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
