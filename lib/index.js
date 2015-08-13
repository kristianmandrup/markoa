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
  },
  lasso: require('./lasso'),
  components: require('./components'),
  App: require('./app'),
  AppMounter: require('./app-mounter'),
  AppContainer: require('./app-container'),
  AppConfigurator: require('./app-configurator'),
  server: {
    config: require('./server/config'),
    Render: require('./server/render'),
    Router: require('./server/router')
  },
  Server: require('./server'),
  utils: require('./utils')
};
