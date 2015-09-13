/*jslint node: true */
'use strict';
let marko = require('marko');
let util = require('util');

// new Render()
module.exports = function(name, config) {
  let app = config.app;

  return function(response, name, templateData) {
   let template = app.template(name, config);
   template = require.resolve(template);
   let data = templateData;
   console.log('rendering template: ' + template);
   console.log('data: ' + util.inspect(data));
   response.body = marko.load(template).stream(data);
   response.type = 'text/html';
 };
};
