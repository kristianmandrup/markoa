"use strict";

let loadFixture = function(resource){
  // load JSON from fixture file
  // TODO: fixture path should be configurable!
  //return utils.load('test/fixtures', resourse);
   return function() {
     return require(`../test/fixtures/${resource}.json`);
   }
}

let loadJson = function(name){
    //return utils.loadJson('test/fixtures', name);
    return loadFixture(name);
}

// Loads a given resource
module.exports = {
  file: loadJson,
  rest: function(){
    // TODO
  }
}
