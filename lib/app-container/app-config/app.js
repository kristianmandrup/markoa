'use strict';
module.exports = function(mounter) {
  return {
    config: function(name) {
      let config = {rootPath: mounter.rootPath};
      config.page = mounter.page.create(name, config);
      return {name: name, config: config};
    },
    configs: function(apps) {
      apps = apps || mounter.appList;
      let self = this;
      // mounting multiple apps from same root dir, blank state
      return apps.map(function(name) {
        return self.config(name);
      });
    }
  }
}
