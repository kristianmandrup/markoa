/*jslint node: true */
'use strict';
module.exports = function(configurator) {
  return {
    config: function(name) {
      let config = {rootPath: configurator.rootPath};
      let App = configurator.App;
      config.app = new App(name, config);
      return {name: name, config: config};
    },
    configs: function(apps) {
      apps = apps || configurator.appList;
      let self = this;
      // mounting multiple apps from same root dir, blank data
      return apps.map(function(name) {
        return self.config(name);
      });
    }
  };
};
