'use strict';
let config = require('./config');
// let marko = config.marko;
let page = require('../app/page');
let marko = require('marko');
let util = require('util');

// new Render()
module.exports = function(name, config) {
  let page = config.page;
  return function(response, name, templateData) {
   // console.log('render - app', name, config);
   let template = page.template(name, config);
   template = require.resolve(template);
   // console.log('render - template', template);
   let state = templateData;
   // console.log('render - state', state);
   console.log('Rendering...' + template);
   console.log('state' + util.inspect(state));
   response.body = marko.load(template).stream(state);
   response.type = 'text/html';
  }
}
