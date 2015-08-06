module.exports = {
  // assumes:
  // apps/[app name]/state/index.js
  findState: function(name, config) {
    let appsPath = path.resolve(config.rootPath, 'apps');
    return path.join(appsPath, name, 'state');
  },
  resolvePageState: function(name, config) {
    let findState = config.findState || this.findState;
    let state = config.state || findState(name, config);
    this.resolve(state, config);
  },
  resolve: function(state, config) {
    let state = state || {};
    return (typeof state === 'function') ? state(name, config) : state;
  }
}
