'use strict';
let path = require('path');
// new app.mounter('index', {...});
module.exports = function (appName, config) {
  return {
    appName: appName,
    // to mount app in an application container
    mountIn: function(appContainer, name) {
      name = name || this.appName;

      // the app must have a mount function which can mount the route of that name
      // and renders page using the temlateState with this app state passed in
      appContainer.mount.config(name, config);
    },
    unmountFrom: function(app, name) {
      name = name || this.appName;
      app.unmount(name);
    }
  }
}
