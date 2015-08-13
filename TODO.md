TODO
====

Component registry
------------------

Auto generating `browser.json` file for each page depending on widgets used.

Gulp task `componentLister`

It should use `src('**/list.components.js')` files and execute each file found to generate a json file`components.json` in the same place:

```sh
apps/_global
  /components
    /top-menu
    list.components.js -> components.json
  /index
    /components
      /my-comp
      list.components.js -> components.json
```

Generates:

```js
// components.json
{
  widgets: {
    'my-widget': './x/y/zab.js',
    ...
  },
  tags: {
    ...
  }
}
```

After this task, we must run a task to analyze each `[app]/page/[app].marko` file for custom tags used. For each such tag `xxx-yyy` we look up in local components.json and global components.json to see if it is registered as a widget there. If so, include the file for that widget in the `[app].browser.json` generated.

```js
var parse5 = require('parse5');

var widgetsRegistry = {};

function writeJsonFile(jsonFileName, jsonObj) {
  var fs = require('fs');
  var json = JSON.stringify(jsonObj, null, 4);
  fs.writeFile(jsonFileName, json, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
  });
}

function addWidget(tagName, file) {
  widgetsRegistry[tagName] = file;
}

var parser = new parse5.SimpleApiParser({
    doctype: function(name, publicId, systemId /*, [location] */) {
        //Handle doctype here
    },

    startTag: function(tagName, attrs, selfClosing /*, [location] */) {
        if (tagName.matches(/-/)) {
          var widgetFile = findWidget(['local', 'global');
          if (widgetFile)
            addWidget(tagName, widgetFile)
        }
    },

});
```

OR faster

```js
var htmlparser = require("htmlparser2");
var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
      if (tagName.matches(/-/)) {
        var widgetFile = findWidget(['local', 'global');
        if (widgetFile)
          addWidget(tagName, widgetFile)
      }
    },
    onend = function(){
      writeJsonFile(appWidgetsFilePath, widgetsRegistry)
    }
}, {decodeEntities: false});
```

Then merge this with the browser.json

var browjson = require('./browser.json'); var widgetsJson = require(appWidgetsFilePath) var widgetDeps = []; for (var key in Object.keys(widgetsJson)) widgetDeps.push(widgetsJson[key]);

widgetDeps = widgetDeps.map(function(dep) { return `require: ${dep}`; });

browjson.dependencies.push(widgetDeps);

writeJsonFile(appBrowserFilePath, browjson);\`\`\`

Super!!!
