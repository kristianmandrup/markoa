'use strict';

let extend = require('extend');
let config = require('./config');
let marko = config.marko;

function resolveTemplate(templateName, findTemplate) {
  let templatePath = findTemplate(templateName);
  return require.resolve(templatePath);
}

// add global state
function pageData(name, config) {
  return extend(config.state, config.global || {});
}

module.exports = {
  factory: function(name, config) {
    return function(response, template) {
     console.log('render - template', template);
     let resolvedTemplate = resolveTemplate(template, config.findTemplate);
     let data = pageData(name, config);
     response.body = marko.load(resolvedTemplate).stream(data);
     response.type = 'text/html';
    }
  }
}
