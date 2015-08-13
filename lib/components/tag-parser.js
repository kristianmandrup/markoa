var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, 'page.html');
var htmlparser = require("htmlparser2");
var Registry = require("./registry");
var findWidget = require("./finder");

module.exports = function(page, cb) {
  page = page.match(/<\.>/) ? page : fs.readFileSync(page);

  var registry = new Registry();
  var parser = new htmlparser.Parser({
      onopentag: function(tagName, attribs){
        if (tagName.match(/-/)) {
          var widgetFile = findWidget(tagName, ['local', 'global']);
          if (widgetFile)
            registry.add(tagName, widgetFile)
        }
      },
      onend: function(){
        cb(registry);
        // writeJsonFile(appWidgetsFilePath, widgetsRegistry)
      }
  }, {decodeEntities: false});
  parser.write(page);
  parser.end();
}
