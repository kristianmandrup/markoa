var fs = require('fs-extra');
module.exports = {
  toJsonFile: function(fileName, obj, cb) {
    fs.writeJson(fileName, obj, {spaces: 2}, function(err) {
      if (err) console.error(err);
      if (typeof cb === 'function') cb();
    });
  }
}
