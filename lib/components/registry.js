/*jslint node: true */
'use strict';

module.exports = function() {
  return {
    store: {},
    add: function(tagName, file) {
      this.store[tagName] = file;
    }
  };
};
