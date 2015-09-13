/*jslint node: true */
'use strict';
let path = require('path');
// let utils = require('../../../utils');

module.exports = function(name, config) {
  let appsPath = path.resolve(config.rootPath, 'apps');
  let appPath = path.join(appsPath, name);

  // Sould recursively resolve each page via App and Page constructors.
  // A sub page can be an indepenedent app, or it can inherit from the main app
  function find() {
    var pages; // = findAppTemplate() || findInheritedTemplate();

    if (!pages) {
      console.warn('WARNING: Pages for ' + appPath+ ' could not be found!');
    } else {
      console.log('found pages');
    }
    return pages;
  }

  return {find: find};
};
