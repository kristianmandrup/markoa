'use strict';
module.exports = function(name, config, key) {
  return {
    // assumes:
    // apps/[app name]/state/index.js
    find: function() {
      throw 'find must be implemented to return an Object or a Function'
    },
    retrieve: function() {
      console.log('retrieve', config, key);
      let thing = config[key] || this.find();
      this.resolve(thing);
    },
    resolve: function(thing) {
      return (typeof thing === 'function') ? thing(name, config) : thing;
    }
  }
}
