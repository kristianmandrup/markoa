'use strict';
let resolver = require('../resolver');

module.exports = function(name, config) {
  // TODO: can we reference registered global data function on server or appContainer?
  return {
    page: resolver.state.retrieve(name, config, 'state'),
    $global: resolver.state.retrieve(name, config, '$global'),
  };
}
