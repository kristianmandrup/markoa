'use strict';
let config = require('./config');
// let marko = config.marko;
let page = require('../app/page');
let marko = require('marko');

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

   response.body = marko.load(template).stream(state);
   response.type = 'text/html';
  }
}
