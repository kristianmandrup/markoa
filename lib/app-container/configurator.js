
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

    // you can override this default appConfig strategy in your app if needed
    pageData: require('../app').pageData,
    findTemplate: require('../app').findTemplate,
    appConfig: function(name) {
      return {rootPath: this.rootPath, findTemplate: this.findTemplate, pageData: this.pageData};
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
