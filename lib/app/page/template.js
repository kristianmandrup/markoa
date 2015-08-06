'use strict';
let resolver = require('../resolver');

module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  let template = resolved.template.retrieve();
  if (!template) {
    console.log('resolved', resolved);
    throw 'Template could not be resolved';
  }
  return require.resolve(template);
}
