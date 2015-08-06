'use strict';

module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  return {
    page: resolved.template.retrieve(),
    $global: resolved.state.retrieve(),
  };
}
