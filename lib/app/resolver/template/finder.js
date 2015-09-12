/*jslint node: true */
'use strict';
let path = require('path');
let utils = require('../../../utils');

module.exports = function(name, config) {
  let appsPath = path.resolve(config.rootPath, 'apps');

  function findAppTemplate(appName) {
    appName = appName || name;
    let pagePath = path.join(appsPath, appName, 'page');
    // legacy
    // let pageTemplateName = name + '.marko';
    let pageTemplateName = 'app.marko';
    let templatePath = path.join(pagePath, pageTemplateName);
    return utils.file.existsSync(templatePath) ? templatePath : false;
  }

  // TODO: Extract for reuse
  function findInheritedTemplate() {
    var meta = utils.meta(appsPath);
    var appName = meta.page ? meta.page.app : (meta.app || meta.inherit);
    return findAppTemplate(appName);
  }

  function find() {
    var template = findAppTemplate() || findInheritedTemplate();
    if (!template) {
      console.warn('WARNING: Page template for ' + appsPath + ' could not be found!!');
    }
    return template;
  }

  return find;
};
