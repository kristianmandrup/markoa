'use strict';

module.exports = {
  app: {
    Mounter: require('./app/mounter'),
    Page: require('./app/page'),
    resolver: {
      State: require('./app/resolver/state'),
      Template: require('./app/resolver/template')
    },
    Mounter: require('./app/mounter'),
    page: {
      State: require('./app/page/state'),
      Template: require('./app/page/template')
    },
    Resolver: require('./app/resolver'),
    utils: require('./utils')
  }
  App: require('./app'),
  AppContainer: require('./app-container'),
  AppConfigurator: require('./app-container/configurator'),
  Server: require('./server'),
  utils: require('./utils')
};
