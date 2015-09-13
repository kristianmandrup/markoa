/*jslint node: true */
'use strict';
let marko = require('marko');
let util = require('util');

// new Render()
module.exports = function(appName, config) {
  let app = config.app;

  return function(response, opts) {
   let appName = opts.name;
   let templateData = opts.data;
   let findTemplate = opts.findTemplate || app.findTemplate;
   let template = findTemplate(appName, config);
   template = require.resolve(template);
   let data = templateData;
   console.log('rendering template: ' + template);
   console.log('data: ' + util.inspect(data));
   response.body = marko.load(template).stream(data);
   response.type = 'text/html';
 };
};
