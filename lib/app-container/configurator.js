'use strict';

let AppConfigMounter = require('./app-config/mounter');

// new appContainer.configurator(__dirname, ['account', 'projects'])
module.exports = function(rootPath, appList) {
  return {
    create: function(koaApp) {
      return new AppConfigMounter(koaApp, rootPath, appList);
    }
  }
}
