'use strict';
module.exports = function(configurator) {
  return {
    config: function(name) {
      let config = {rootPath: configurator.rootPath};
      let App = configurator.App;
      config.page = new App(name, config);
      return {name: name, config: config};
    },
    configs: function(apps) {
      apps = apps || configurator.appList;
      let self = this;
      // mounting multiple apps from same root dir, blank state
      return apps.map(function(name) {
        return self.config(name);
      });
    }
  }
}