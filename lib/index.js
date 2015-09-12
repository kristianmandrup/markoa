'use strict';

module.exports = {
  app: {
    Mounter: require('./app/mounter'),
    Page: require('./app/page'),
    resolver: {
      Data: require('./app/resolver/data'),
      Template: require('./app/resolver/template')
    },
    Mounter: require('./app/mounter'),
    page: {
      Data: require('./app/page/data'),
      Template: require('./app/page/template')
    },
    Resolver: require('./app/resolver'),
    utils: require('./utils')
  },
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
