var fs = require('fs');

function mergeBrowson(appPath, appName) {
  var browsonPath = path.join(appPath, './browser.json');
  var browjson = require(browsonPath);
  var appWidgetsFilePath = path.join(appPath, './widgets.json');

  var widgetsJson = require(appWidgetsFilePath);
  var widgetDeps = [];
  // collect widget values (files)
  for (var key in Object.keys(widgetsJson)) {
    widgetDeps.push(widgetsJson[key]);
  }
  // turn them into correct dependency require format for browser.json (lasso)
  widgetDeps = widgetDeps.map(function(dep) { return `require: ${dep}`; });

  // add widget require deps to browser.json dependencies
  browjson.dependencies.push(widgetDeps);

  // store final browser.json as [app-name].browser.json, referenced by lasso tag in page!
  var appBrowserFilePath = [appName, browsonPath].join('.');
  return writeJsonFile(appBrowserFilePath, browjson);
}

module.exports = {
  merge: mergeBrowson
}
