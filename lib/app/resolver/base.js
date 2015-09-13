/*jslint node: true */
'use strict';
module.exports = function(name, config, key) {
  return {
    // assumes:
    // apps/[app name]/data/index.js
    find: function() {
      throw 'find must be implemented to return an Object or a Function';
    },
    retrieve: function() {
      let thing = config[key] || this.find();
      let resolved = this.resolve(thing);
      return resolved;
    },
    resolve: function(thing) {
      return (typeof thing === 'function') ? thing : function() { return thing; };
    }
  };
};
