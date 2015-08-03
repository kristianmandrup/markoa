'use strict';
module.exports = function(app, opts) {
  opts = opts || {};
  let options = opts.scss;
  if (!(options && options.dir)) {
    throw 'Missing scss: in options for scss mw';
  }
  app.use(scss({
      src: options.dir,
      dest: options.dir,
      debug: options.debug,
      force: options.force
  }));
}
