module.exports = {
  browserSync: require('./mw/browser-sync'),
  lasso: require('./mw/lasso'),
  router: require('./mw/router'),
  assets: require('./mw/static'),
  compile: {
    scss: require('./mw/scss'),
    stylus: require('./mw/stylus')
  }
}
