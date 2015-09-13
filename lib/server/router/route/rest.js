/*jslint node: true */
'use strict';
var path = require('path');

function restRoute(router, routePath, method, handler) {
  console.log(`create route for REST method ${method.toUpperCase()}:${routePath}`);
  router[method](routePath, handler);
}

function paramRestRoutes(router, routePath, method, routeObj) {
  for (let key of Object.keys(routeObj)) {
    if (key === '.') {
      key = '';
    }
    routePath = path.join(routePath, key);
    let handler = routeObj[key];
    restRoute(router, routePath, method, handler);
  }
}

module.exports.restRoutes = function (router, routePath, methods) {
  for (let method of Object.keys(methods)) {
    let handler = methods[method];

    if (typeof handler === 'object') {
      paramRestRoutes(router, routePath, method, handler);
    }
    else {
      restRoute(router, routePath, method, handler);
    }
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
