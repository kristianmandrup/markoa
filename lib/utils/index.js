/*jslint node: true */
'use strict';

let bluebird  = require('bluebird');
let loader = require('./loader');
let data = require('./data');
let meta = require('./meta');
let file = require('./file');
let log = require('./log');

module.exports = {
  data: data,
  meta: meta,
  file: file,
  log: log,
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
};
