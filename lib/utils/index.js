'use strict';

let bluebird  = require('bluebird');
let loader = require('./loader');

module.exports = {
  loader: loader,
  delayed: function(fn, delay) {
    // simulate delay of calling API and retrieving real data :)
    return bluebird.delay(delay).then(fn);
  },
  loadJson: function(folder, resource) {
    return require(`../${folder}/${resource}.json`);
  },
  loadYaml: function(folder, resource) {
    return require(`../${folder}/${resource}.json`);
  }
}
