'use strict';
let config = require('./config');
let page = require('../app/page');
let marko = require('marko');
let util = require('util');

// new Render()
module.exports = function(name, config) {
  let page = config.page;

  return function(response, name, templateData) {
   let template = page.template(name, config);
   template = require.resolve(template);
   let state = templateData;
   console.log('rendering template: ' + template);
   console.log('state: ' + util.inspect(state));
   response.body = marko.load(template).stream(state);
   response.type = 'text/html';
  }
}
