'use strict';
var fs = require('fs');

module.exports = {
  existsSync: function(filePath) {
    try {
      fs.statSync(filePath);
    } catch(err) {
      if(err.code === 'ENOENT') {
        return false;
      }
    }
    return true;
  }
};
