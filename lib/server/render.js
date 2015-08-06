'use strict';
let config = require('./config');
let marko = config.marko;

let page = require('../app/page');

module.exports = {
  factory: function(name, config) {

    return function(response, name) {
     console.log('render - template', name);
     let template = page.template(name, config);
     let state = page.state(name, config);
     response.body = marko.load(template).stream(state);
     response.type = 'text/html';
    }
  }
}
