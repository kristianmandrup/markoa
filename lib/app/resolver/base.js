/*jslint node: true */
'use strict';
module.exports = function(name, config, key) {
  return {
    // assumes:
    // apps/[app name]/state/index.js
    find: function() {
      throw 'find must be implemented to return an Object or a Function';
    },
    retrieve: function() {
      let thing = config[key] || this.find();
      return this.resolve(thing);
    },
    resolve: function(thing) {
      return (typeof thing === 'function') ? thing : function() { return thing; };
    }
  };
};
