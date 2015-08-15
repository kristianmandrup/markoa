var fs = require('fs');
var path = require('path');
var transform = require('./transform');
var beautify = require('js-beautify').html;

module.exports = function(templateFile, cb) {
  fs.readFile(templateFile, 'utf8', function (err, data) {
    if (err) return console.log(err);
    transform(data, function(tags) {
      var xml = tags.toString();
      var xml = beautify(xml, { indent_size: 2 });
      // post beautify processing of liquid expr (extra new line + tab)
      var liquid = xml.replace(/<liquid\s+expr=["'](.*?)["']\s+\/>/ig, function(match, p1) {
        return p1;
      });
      cb(liquid);
    });
  });
}
