'use strict';
let path = require('path');
let utils = require('../utils');
let AppContainer = require('../app-container');

let projectConf = require('../config').project;

function globalState(rootPath) {
  return utils.data.retrieve(path.join(rootPath, projectConf.apps.global.data.path));
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

  // TODO: addStaticAssets for global styles as well ;)

  let configurator = {
    appContainer: appContainer,
    appList: appList || [],
    rootPath: rootPath,
    App: opts.App || require('../app'),
    // you can override this default appConfig strategy in your app if needed
    mountApps: function(list) {
      this.appContainer.mount.configs(this.appConfig.configs(list))
      return this;
    },
    start: function(args) {
      this.appContainer.start(args);
    }
  };
  configurator.appConfig = require('./app-config')(configurator)
  return configurator;
}
