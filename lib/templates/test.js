var path = require('path');
var liquify = require('./liquify');
var templateFile = path.join(__dirname, 'template.marko');
liquify(templateFile, function(liquid) {
  console.log(liquid);
});
