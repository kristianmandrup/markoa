
// new appContainer.configurator(__dirname, ['account', 'projects'])
module.exports = function(rootPath, appList) {
  let appList = appList || [];
  return {
    markoa: {},
    init: function(koaApp) {
      this.markoa.appContainer = markoa.appContainer().init(koaApp).start();
      return this;
    },
    rootPath: rootPath,
    page: require('../app').page,
    // you can override this default appConfig strategy in your app if needed
    appConfig: function(name) {
      return {rootPath: this.rootPath, page: this.page};
    },

    appList: appList,
    appConfigs: function(apps) {
      apps = apps || this.appList;
      // mounting multiple apps from same root dir, blank state
      return apps.map(function(name) {
        return app.config(name, this.appConfig(name));
      });
    },
    mountApps: function(list) {
      this.markoa.appContainer.mount.configs(this.appConfigs(list))
    }
  }
}
