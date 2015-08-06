Markoa
======

Markoa consists of the following main parts:

-	app
-	app container
-	server
-	utils

To access each part, simply use the main `markoa` object as follows:

```js
let markoa = require('markoa');
let app = markoa.app;
// create new container instance
let appContainer = markoa.appContainer();
let server = markoa.server
let utils = markoa.utils
```

Server
------

It is super simple to setup the Markoa server with some basic settings:

```js
let marko  = require('markoa');
let lassoFile = path.join(__dirname, './lasso-config.json');
let staticDir = path.join(__dirname, '../public');
let app = markoa.server.configure(koa(), {
  port: 4004,
  lasso: {
    file: lassoFile,
  },
  static: {
    dir: staticDir
    debug: true,
    force: true
  }
});
```

By default the koa server will use port `4000` if no settings are provided.

### App file structure

The default (implied) app structure. For any custom app structure, you must supply your own `findTemplate` and `pageData` functions in the app `config` Object when mounting your apps.

```sh
/apps
  /_global
    /components
    /state
      index.js
    /layouts
      _default_page.jade
  /index
    /components
      /project-feed
        template.marko
    /layouts
      _mobile.jade
    /state
      index.js
    /page
      index.jade
      _index-layout.jade
      _index-layout.marko
      index.marko
      index.browser.json
    marko-taglib.json
  /repositories
  /teams
  ...
  marko-taglib.json  
```

### App

An `App` is simply an Object with a specific structure that defines where or how specific "endpoints" of the app can be retrieved, such as the main page template and the page state of the app. An app can also contribute to the global state via the special `$global` entry. There are several ways to create an app:

```js
let app = {
  rootPath: __dirname,
  page: {
    state: {
      page: function(name, config) {},
      $global: function(name, config) {}
    },
    template: function(name) {
      return 'path/to/template';
    }
  }
};

let config = {rootPath: __dirname, page: {template: 'path/to/template' }}
let myApp = new markoa.app.create(name, config);
```

### App container

You can mount one or more apps directly on your `AppContainer`

```js
let AppContainer = markoa.AppContainer;
let myAppContainer = new AppContainer(koaApp); //.start();
myAppContainer.mount.app(app);
```

### App configurator

You can use the `AppConfigurator` to configure multiple apps to be mounted on an `AppContainer`. The `AppConfigurator` uses config objects to mount an app using either default stretegies for resolving the main page template and state of each app, or custom strategies you supply.

You can customize the configurator as needed, then call `mountApps` with the list of apps you wish to mount on the app container.

```js
let lassoFile = path.join(__dirname, './lasso-config.json');
let serverOpts = {port: 4005, lassoFile: lassoFile};
let koaApp = new Server(serverOpts).init(function(mws) {
  // configure koa middleware
  mws.minimal();
});

let appConfigurator = new markoa.AppConfigurator(__dirname);
let appMounter = appConfigurator.create(koaApp, appContainer);
appMounter.page = myPage; // set custom page strategy

let apps = ['project', 'repository'];
// mounting multiple apps on appContainer instance
appMounter.mountApps(apps);
```

Local testing
-------------

Run `npm link` from markoa root folder to link the package.

Then from an app or appContainer that uses markoa, use `npm link markoa` to link the dependency, which creates a symbolic link in your `node_modules` pointing to your local markoa package.

Now run `npm install` from your app ;)
