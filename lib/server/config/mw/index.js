'use strict';
module.exports = function(app, options) {
  let api = {
    defaultList: ['static', 'request', 'response', 'lasso', 'router'],
    minimalList: ['request', 'response', 'router'],
    list: function() {
      options.mws || this.defaultList;
    },
    // config via list of strings
    config: function(mws) {
      mws = mws || this.list();
      for (let mw of mws) {
        let fn = this[mw];
        if (typeof fn === 'function')
          fn();
      }
      return this;
    },
    minimal: function() {
      return this.config(this.minimalList);
    },
    all: function() {
      for (mw of this.list())
        this.config(mw);
      return this;
    }
  };

  for (let mw of api.defaultList) {
    api[mw] = function() {
      require(`./${mw}`)(app, options);
      return this;
    }
  }
  return api;
};
