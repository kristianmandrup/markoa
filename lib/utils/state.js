'use strict';
let fs = require('fs');

let stateUtil = {
  // TODO: enable retrieval dependant on current process.ENV, such as test state, production state etc.
  // process.env.NODE_ENV
  forEnv: function(state, env) {
    env = env || process.env.NODE_ENV;
    return state[env] || state['default'] || state;
  },
  retrieve: function(path) {
    try {
      // console.log('retrieve state for', path);
      let state = require(path) || {};
      // console.log('state', state);
      let resolvedState = stateUtil.forEnv(state);
      // console.log('resolvedState', resolvedState);
      return resolvedState;
    } catch (e) {
      // console.error(e);
      console.warn('ERROR: could not retrieve state at ' + path);
      console.warn('Most likely an error in your code there that generates the JSON!!');
      return {};
    }
  }
}

module.exports = stateUtil;
