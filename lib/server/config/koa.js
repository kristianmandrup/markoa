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
