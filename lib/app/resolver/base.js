'use strict';
module.exports = function(name, config) {
  return {
    // assumes:
    // apps/[app name]/state/index.js
    find: function() {
      throw 'find must be implemented to return an Object or a Function'
    },
    retrieve: function() {
      let thing = config[key] || this.find;
      this.resolve(thing);
    },
    resolve: function(thing) {
      return (typeof thing === 'function') ? thing(name, config) : state;
    }
  }
}
