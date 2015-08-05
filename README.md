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

### App container

You can use the Configurator to configure multiple apps to be mounted on the App Container.

```js
let appConfigurator = new appContainer.configurator(__dirname, ['account', 'projects']);
appConfigurator.mountApps();
```

You can customize the configurator as needed, then call `mountApps` with the list of apps you wish to mount on the app container.

```js
let appConfigurator = new appContainer.configurator(__dirname);
appConfigurator.pageData = myPageDataFn;
appConfigurator.mountApps('projects', 'teams']);
```

Local testing
-------------

Run `npm link` from markoa root folder to link the package.

Then from an app or appContainer that uses markoa, use `npm link markoa` to link the dependency, which creates a symbolic link in your `node_modules` pointing to your local markoa package.

Now run `npm install` from your app ;)
