/*jslint node: true */
'use strict';

module.exports = {
  obj: function(obj) {
    return JSON.stringify(obj, null, 2);
  }
};
