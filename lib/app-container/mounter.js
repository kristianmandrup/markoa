'use strict';
let routes = require('./routes');
let fs = require('fs');

// new appContainer.mounter(myAppContainer);
module.exports = function(appContainer) {
  return {
    // config: Object
    config: function(name, config) {
      if (!name) throw 'appContainer:Mounter missing name';
      if (!config) throw 'appContainer:Mounter missing config';
      // add app to registry
      // mount route using config
      appContainer.apps[name] = config;
      let templatePath = config.page.template(name, config);
      try {
        if (!fs.statSync(templatePath).isFile()) {
          console.warn('WARNING: template ' + path + ' is not a file');
        }
      } catch (e) {
        console.error(e);
        console.warn('WARNING: NO template at ' + templatePath);
      }
      appContainer.addViewsDir(name, config);
      return appContainer;
    },
    // mount array of app config
    configs: function(appConfigs) {
      for (let app of appConfigs) {
        appContainer.mount.config(app.name, app.config);
      }
      return appContainer;
    },
    app: function(app) {
      app.mountIn(appContainer);
      return appContainer;
    },
    // mount multiple apps
    apps: function(apps) {
      for (let app of apps) {
        if (typeof app === 'object') {
          if(!app.mountIn) throw `Invalid app: ${app}`;
          app.mountIn(appContainer);
        } else {
          throw `Invalid app: ${app}`;
        }
      }
      return appContainer;
    }
  };
}
