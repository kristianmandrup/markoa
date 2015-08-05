'use strict';

let extend = require('extend');
let config = require('./config');
let marko = config.marko;

module.exports = {
  factory: function(name, config) {
    return function(response, template) {
     console.log('render - template', template);
     let resolvedTemplate = this.resolveTemplate(template, config.findTemplate);
     let pageData = config.pageData || this.pageData;
     let data = pageData(name, config);
     response.body = marko.load(resolvedTemplate).stream(data);
     response.type = 'text/html';
    }
  },

  resolveTemplate: function(templateName, findTemplate) {
    let templatePath = findTemplate(templateName);
    return require.resolve(templatePath);
  },

  // default pageData function
  // add global state
  pageData: function(name, config) {
    // TODO: can we reference registered global data function on server or appContainer?
    return extend(config.state, config.global || {});
  }
}
