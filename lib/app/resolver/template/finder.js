/*jslint node: true */
'use strict';
let path = require('path');
let utils = require('../../../utils');

module.exports = function(name, config) {
  let appsPath = path.resolve(config.rootPath, 'apps');
  let appPath = path.join(appsPath, name);

  function findAppTemplate(appName, pageName) {
    appName = appName || name;
    let pagePath = path.join(appsPath, appName, 'page');
    // legacy
    // let pageTemplateName = name + '.marko';
    let pageTemplateName = pageName + '.marko';
    let templatePath = path.join(pagePath, pageTemplateName);
    // console.log('findAppTemplate', appName, templatePath);
    return utils.file.existsSync(templatePath) ? templatePath : false;
  }

  // TODO: Extract for reuse
  function findInheritedTemplate(pageName) {
    var meta = utils.meta(appPath);
    // console.log('template meta', appPath, meta);
    var appName = meta.page ? meta.page.app : (meta.app || meta.inherit);
    // console.log('findInheritedTemplate', appName);
    return findAppTemplate(appName, pageName);
  }

  function find(pageName) {
    var template = findAppTemplate(name, pageName) || findInheritedTemplate(pageName);

    if (!template) {
      console.warn('WARNING: Page template ' + pageName + ' for ' + appPath+ ' could not be found!!');
    }
    // else {
    //   console.log('found template:' + template);
    // }
    return template;
  }

  return {find: find};
};
