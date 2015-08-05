'use strict';
// let extend = require('extend');

function resolve(state) {
  let state = state || {};
  return (typeof state === 'function') ? state(name, config) : state;
}

module.exports = function(name, config) {
  // TODO: can we reference registered global data function on server or appContainer?
  return state {
    page: resolve(config.state),
    $global: resolve(config.global)
  };
}
