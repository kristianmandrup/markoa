/*jslint node: true */
'use strict';
let resolver = require('../resolver');
let fs = require('fs');

module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  let template = resolved.template.retrieve();
  if (!template) {
    throw 'Template could not be resolved';
  }

  return template;
};
