'use strict';
let serve = require('koa-static');

let defaultStaticDirs = ['public', 'semantic/dist'];

function addStaticDir(app, dir) {
  console.log('Added static dir:' + dir);
  app.use(serve(dir));
}

module.exports = function(app, opts) {
  opts = opts || {};
  let options = opts.static;
  if (!(options)) {
    console.warn('Missing static: in options for static mw');
  }
  options = options || {};

  if (options.dir)
    addStaticDir(app, options.dir);

  let dirs = options.dirs || defaultStaticDirs;
  if (!dirs) return;

  for (let dir of dirs) {
    addStaticDir(app, dir);
  }
}
