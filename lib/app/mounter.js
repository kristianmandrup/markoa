'use strict';
let path = require('path');

module.exports = function (appName, config) {
  return {
    appName: appName,
    findTemplate: function (name) {
      let viewsPath = path.resolve(config.rootPath, 'views');
      let pagePath = path.join(viewsPath, 'page');
      let templateName = name + '.marko';
      return path.join(pagePath, templateName);
    },

    // to mount app in an application container
    mountIn: function(appContainer, name) {
      name = name || this.appName;

      // the app must have a mount function which can mount the route of that name
      // and renders page using the temlateState with this app state passed in
      appContainer.mount.config(name, {
        state: config.state,
        findTemplate: this.findTemplate
      });
    },
    unmountFrom: function(app, name) {
      name = name || this.appName;
      app.unmount(name);
    }
  }
}
