/*jslint node: true */
'use strict';

module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  // console.log('resolved.data', resolved.data);
  return {
    page: resolved.data.page.retrieve(),
    $global: resolved.data.$global.retrieve(),
  };
};
