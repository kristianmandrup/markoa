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
      console.log('retrieve', key);
      let thing = config[key] || this.find();
      let resolved = this.resolve(thing);
      console.log('resolved', resolved);
      return resolved;
    },
    resolve: function(thing) {
      return (typeof thing === 'function') ? thing : function() { return thing; };
    }
  };
};
