'use strict';
let resolver = require('../resolver');

module.exports = function(name, config) {
  // TODO: can we reference registered global data function on server or appContainer?
  let template = resolver.template.retrieve(name, config, 'template');
  return require.resolve(template);
}
