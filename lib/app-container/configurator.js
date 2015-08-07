'use strict';

let AppConfigMounter = require('./app-config/mounter');

// new appContainer.configurator(__dirname, ['account', 'projects'])
module.exports = function(rootPath, appList) {
  return {
    create: function(appContainer) {
      return new AppConfigMounter(appContainer, {root: rootPath, apps: appList});
    }
  }
}
