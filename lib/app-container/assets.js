'use strict';
module.exports = function (appContainer) {
  let koaApp = appContainer.koaApp;
  if (!koaApp) throw 'appContainer.Routes must take an AppContainer with a KoaApp configured';

  let addStaticAssets = koaApp.config.mws.assets;

  return {
    appContainer: appContainer,
    koaApp: koaApp,
    // registry of routes to SPAs added
    assetFolders: [],
    add: function(appName, config) {
      try {
        if (!config) throw `Assets.add missing config for ${appName}`;
        var assetsPath = path.join(config.rootPath, appName, config.page.assets.path)
        addStaticAssets(this.koaApp, {dir: assetsPath});
        this.assetFolders.push(name);
      } catch (e) {
        console.error('ERROR: Unable to add static Assets path for:', appName, config);
      }
    }
  }
}
