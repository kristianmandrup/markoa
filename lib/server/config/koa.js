'use strict';
let mw = require('./mw');
module.exports = function(app, options) {
  return {
    default: {
      port: 4000,
      refresh: true,
      reload: true
    },
    init: function(cb) {
      cb(mw(app, options));
      return this;
    },
    start: function(appContainer) {
      let port = options.port || this.default.port;
      let refresh = options.refresh || this.default.refresh;
      let reload = appContainer.reload || options.reload || this.default.reload;

      if (refresh) {
        require('marko/browser-refresh').enable();
        console.log('Marko browser refresh enabled!!');
        console.log('Install browser-refresh');
        console.log('npm install browser-refresh-taglib --save');
        console.log('npm install browser-refresh --global');
        console.log('Start server with: $ browser-refresh server.js');
        console.log('Add <browser-refresh enabled="true" /> to just before </body> in your main page template');
      }

      if (reload) {
        let markoConfig = require('./marko');
        markoConfig({views: appContainer.views});
      }

      app.listen(port, function() {
        console.log(`Marko appplication ready on port ${port}`);
        // for browser refresh!
        if (process.send) {
          process.send('online');
        }
      });
      return app;
    }
  }
}
