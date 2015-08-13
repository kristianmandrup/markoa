module.exports = function(jsonFileName, jsonObj) {
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
