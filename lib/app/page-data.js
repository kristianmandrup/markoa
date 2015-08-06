'use strict';
let stateResolver = require('./state-resolver');

module.exports = function(name, config) {
  // TODO: can we reference registered global data function on server or appContainer?
  return state {
    page: stateResolver.resolvePageState(name, config),
    $global: stateResolver.resolve(config.global, config)
  };
}
