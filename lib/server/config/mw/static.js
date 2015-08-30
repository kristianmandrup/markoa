'use strict';
let serve = require('koa-static');
let defaultStaticDirs = ['public', 'dist', 'semantic/dist'];

function addStaticDir(app, dir) {
  app.staticDirs = app.staticDirs || [];
  app.staticDirs.push(dir);
  try {
    app.use(serve(dir));
    console.log('added static path:', dir);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = function(app, opts) {
  opts = opts || {};
  let options = opts.static || opts;
  if (typeof options !== 'object') {
    console.warn('static: options must be an object');
  }
  options = options || {};

  if (!app.staticDirs) {
    options.dirs = options.dirs || [];
    options.dirs = options.dirs.concat(defaultStaticDirs);
  }

  if (options.dir)
    addStaticDir(app, options.dir);

  let dirs = options.dirs;
  if (!dirs) return;

  for (let dir of dirs) {
    addStaticDir(app, dir);
  }
}
