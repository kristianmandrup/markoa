'use strict';
module.exports = function(mounter) {
  return {
    config: function(name) {
      return {rootPath: mounter.rootPath, page: mounter.page};
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
