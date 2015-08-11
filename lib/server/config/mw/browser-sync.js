'use strict';
module.exports = function(app, opts) {
  // Get the snippet from BROWSERSYNC_SNIPPET environment variable
  // (usefull to start browser-sync from a build tool like gulp, grunt, etc)
  if (app.env == 'development') {
    // Use init option to start the server, default: false
    // Other options are passed directly to browser-sync
    // ex: {init:true, files: ["app/css/**/*.css"], logConnections: false}
    app.use(require('koa-browser-sync')({init: true}));
  }
}
