'use strict';
let mw = require('./mw');
module.exports = function(app, options) {
  return {
    default: {
      port: 4000
    },
    init: function(cb) {
      cb(mw(app, options));
      return this;
    },
    start: function() {
      let port = options.port || this.default.port;

      // Get the snippet from BROWSERSYNC_SNIPPET environment variable
      // (usefull to start browser-sync from a build tool like gulp, grunt, etc)
      if (app.env == 'development') {
        // Use init option to start the server, default: false
        // Other options are passed directly to browser-sync
        // ex: {init:true, files: ["app/css/**/*.css"], logConnections: false}
        app.use(require('koa-browser-sync')({init: true}));
      }

      app.listen(port, function() {
        console.log(`Koa appplication render service listens on port ${port}`);
        if (process.send) {
          process.send('online');
        }
      });
      return app;
    }
  }
}
