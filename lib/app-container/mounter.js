'use strict';
let routes = require('./routes');

// new appContainer.mounter(myAppContainer);
module.exports = function(appContainer) {
  return {
    // config: Object
    config: function(name, config) {
      // add app to registry
      // mount route using config
      appContainer.apps.push(name);
      appContainer.routes.add(name, config);
    },
    // mount array of app config
    configs: function(appConfigs) {
      for (let app of appConfigs) {
        appContainer.mount(app.name, app.config);
      }
    },
    app: function(app) {
      app.mountIn(appContainer);
    },
    // mount multiple apps
    apps: function(apps) {
      for (let app of apps) {
        app.mountIn(appContainer);
      }
    }
  }
}
