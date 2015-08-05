'use strict';
let config = require('./config');
let marko = config.marko;

module.exports = {
  factory: function(name, config) {
    return function(response, template) {
     console.log('render - template', template);
     let findTemplate = config.findTemplate || this.findTemplate;
     let resolvedTemplate = this.resolveTemplate(template, findTemplate);
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
  pageData: require('../app').pageData,
  findTemplate: require('../app').findTemplate
}
