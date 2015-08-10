'use strict';
let stateUtil = {
  // TODO: enable retrieval dependant on current process.ENV, such as test state, production state etc.
  // process.env.NODE_ENV
  forEnv: function(state, env) {
    env = env || process.env.NODE_ENV;
    return state[env] || state['default'] || state;
  },
  retrieve: function(path) {
    try {
      if (!fs.exists(path, function()) {
        console.warn('WARNING: could not retrieve state at ' + path);
        return {};
      })
      let state = require(path) || {};
      return stateUtil.forEnv(state);
    } catch (e) {
      console.error(e);
      console.warn('WARNING: could not retrieve state at ' + path);
      return {};
    }
  }
}

module.exports = stateUtil;
