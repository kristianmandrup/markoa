'use strict';

module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  return {
    page: resolved.state.page.retrieve(),
    $global: resolved.state.$global.retrieve(),
  };
}
