/*jslint node: true */
'use strict';

module.exports.restRoutes = function (router, routePath, methods) {
  for (let meth of Object.keys(methods)) {
    let restActionHandler = methods[meth];
    console.log(`create route for REST method ${meth.toUpperCase()}:${routePath}`);
    router[meth](routePath, restActionHandler);
  }
};

const restMethods = {
  post: 'post',
  create: 'post',
  update: 'put',
  put: 'put',
  delete: 'delete',
  remove: 'delete'
};

module.exports.restMethods = restMethods;

module.exports.restOnly = function (methods) {
  if (typeof methods !== 'object') {
    return [];
  }
  let filtered = {};
  let methodNames = Object.keys(methods);
  // TODO: refactor: Use map, similar or similar!
  for (let name of methodNames) {
    let mappedName = restMethods[name];
    if (mappedName) {
      filtered[mappedName] = methods[name];
    }
  }
  return filtered;
};
