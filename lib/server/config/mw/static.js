/*jslint node: true */
'use strict';

let serve = require('koa-static');
let defaultStaticDirs = ['public', 'dist', 'semantic/dist'];

function addStaticDir(app, dir) {
  try {
    if (typeof dir !== 'string') {
      return;
    }
    app.use(serve(dir));
    app.staticDirs = app.staticDirs || [];
    app.staticDirs.push(dir);
    return dir;
  } catch (e) {
    console.error(e);
    return false;
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
  let dirs = options.dirs || [];
  dirs.push(options.dir);
  if (!Array.isArray(dirs)) {
    return;
  }
  console.log('---------------------');
  console.log('    STATIC');
  console.log('---------------------');
  let addedDirs = [];

  for (let dir of dirs) {
    let statDir = addStaticDir(app, dir);
    if (statDir) {
      addedDirs.push(statDir);
    }
  }
  console.log('added static dirs:\n' + addedDirs.join('\n'));
}
