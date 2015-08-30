'use strict';
var path = require('path');

module.exports = function (appContainer) {
  let koaApp = appContainer.koaApp;
  if (!koaApp) throw 'appContainer.Routes must take an AppContainer with a KoaApp configured';

  let addStaticAssets = koaApp.config.mws.assets;
  let assetFolders = [];

  let assets = {
    appContainer: appContainer,
    koaApp: koaApp,
    assetFolders: assetFolders,
    // registry of routes to SPAs added
    add: function(appName, config) {
      try {
        if (!config) {
          throw `Assets.add missing config for ${appName}`;
        }
        var pageAssetsPath = config.page.assets.path;
        let pageWidgetsPath = config.page.components.widgets.path;

        var assetsPath = path.join(appContainer.rootPath, 'apps', pageAssetsPath);
        var widgetsPath = path.join(appContainer.rootPath, 'apps', pageWidgetsPath);
        let staticPaths = [assetsPath, widgetsPath];

        addStaticAssets(koaApp.app, {dirs: staticPaths});
        assetFolders.push(appName);
      } catch (e) {
        console.error('ERROR: Unable to add static Assets path for:', appName, assetsPath, config);
      }
    }
  };
  return assets;
}
