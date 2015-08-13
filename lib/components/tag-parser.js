var fs = require('fs');
var path = require('path');
var htmlparser = require("htmlparser2");
var Registry = require("./registry");
var finder = require("./finder");

module.exports = function(registryPaths) {
  var findWidget = finder(registryPaths);
  return function(page, cb) {
    page = page.match(/<\.>/) ? page : fs.readFileSync(page);

    var registry = new Registry();
    var parser = new htmlparser.Parser({
        onopentag: function(tagName, attribs){
          if (tagName.match(/-/)) {
            var widgetFile = findWidget(tagName);
            if (widgetFile)
              registry.add(tagName, widgetFile)
          }
        },
        onend: function(){
          cb(registry.store);
          // writeJsonFile(appWidgetsFilePath, widgetsRegistry)
        }
    }, {decodeEntities: false});
    parser.write(page);
    parser.end();
  }
}
