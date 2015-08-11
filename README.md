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

`npm install koa koa-body-parser koa-compress koa-router koa-static lasso lasso-marko marko-layout --save`

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
let myApp = new markoa.App('project', projConfig);
let myAppContainer = new markoa.AppContainer(koaApp); //.start();
myAppContainer.mount.app(myApp);
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

// merge apps (app configurations) from another AppContainer
appContainer.join(otherAppContainer);

// container is optional. If not supplied, a new one will be created
let appConfigurator = new markoa.AppConfigurator({rootPath: __dirname, container: appContainer});

let apps = ['project', 'repository'];
// mounting multiple apps on appContainer instance
appConfigurator.mountApps(apps);
// creates routes for all apps in container and starts server
appContainer.start(koaApp);
```

### App Mounter

For the simplest cases, simply use the `AppMounter` like this:

```js
var mounter = new markoa.AppMounter(__dirname);
mounter.mountApps(apps);
mounter.appContainer.start(koaApp);
```

### App state

An `/apps` folder being mounted, can contribute to the global state of the app container where it mounts. You should have a file `apps/_global/state.js` or `apps/_global/state/index.js` which returns an Object or a function of the form `function(name, config)`, where name is the name of the current app trying to access global state and config is a config object.

Each app on its own should also have a state, such as for the `index` app, either: `apps/index/state.js` or `apps/index/state/index.js` adhering to the same rules as for global state.

For more advanced scenarios, you can even provide different state for each environment: `development`, `test` and `production`, simply by having top level state object keys for each such environment you wish to support. You can provide a `default:` key for default state for environment not defined, if none of these keys are found it will default to retrieve the entire state.

Local testing
-------------

Run `npm link` from markoa root folder to link the package.

Then from an app or appContainer that uses markoa, use `npm link markoa` to link the dependency, which creates a symbolic link in your `node_modules` pointing to your local markoa package.

Now run `npm install` from your app ;)
