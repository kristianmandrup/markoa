/*jslint node: true */
'use strict';
let AppConfigurator = require('../app-configurator');

module.exports = function(rootPath, appNames) {
  return new AppConfigurator({rootPath: rootPath, apps: appNames});
};
