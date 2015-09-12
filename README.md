Markoa
======

Note: This project is referenced as `marooka` since `markoa` was already taken on `npm`.

Markoa consists of the following main parts:

-	app
-	app configurator
-	app container
-	app mounter
-	components
-	config
-	server
-	templates
-	utils

Use the main `markoa` object as follows:

```js
let markoa = require('markoa');
let app = markoa.app;
```

See `lib/index` for the full external API.

Server
------

It is super simple to mount a basic app on Markoa if it follows conventions.

```js
let marooka = require('marooka')
let apps = ['index', 'projects', 'login']
let rootPath = __dirname
module.exports = new marooka.AppMounter(rootPath).mountApps(apps).start();
```

By default the koa server will use port `4000` if no extra settings are provided.

### App file structure

For any custom app structure, you may supply your own `findTemplate` and `pageData` functions in the app `config` Object when mounting your apps.

The project file structure should look as follows.

```
/apps
  /_global
    /components - custom taglibs and tags
      /tags
        /feed
          /project-feed
            marko-tag.json
            renderer.js
            template.jade
            template.marko
        marko-taglib.json
      /widgets
        marko-taglib.json
      marko-taglib.json

    /data - state available to all apps as $out.global
      index.js
      /available
        index.js
        categories.js        
        ...
      /feeds
        index.js

    /layouts - generic layouts
      layout.jade
      item-layout.jade
      list-layout.jade

  /index - app
    meta.js  - app meta data
    /components - app specific components
      marko-taglib.json

    /layouts - special page layouts
      mobile.jade
      base.jade

    /page - page for app
      app.jade
      app.marko
      /dependencies
        broser.json
        app.browser.json - lasso config file
        widgets.json

    /data - state for index app, available as $data
      global.js - reuse global data from local app
      index.js - local state for index app only

    marko-taglib.json

  /repositories - app
    meta.js
    ...
  /teams - app
  ...
marko-taglib.json  
```

### Generating apps

The generator [slush-markoa](https://github.com/kristianmandrup/slush-markoa) can be used to generate projects and other artifacts.

Generate a new app:

`slush markoa:app`

This generator will create an app under `apps/[app-name]` similar to the default `index` app generated by the default marko generator. Use this generator each time you want to add an app!

```sh
/[app]
  /components
    /tags
      /project-feed
        template.jade
        ...
  /layouts
    base.jade
  /data
    global.js
    index.js
  /page
    meta.js
    app.jade
    app.marko
    /dependencies
      app.browser.json
  marko-taglib.json
```

### Sub pages

*TODO: WIP*

Sometimes an app contains sub pages. To support this, markoa should be able to understand how to mount sub-routes for a given app. Only two levels are allowed and possible at this point.

```
/users
  /page
    app.jade
    app.marko
    /pages
      details.jade
      feed.jade

    /dependencies
      app.browser.json
```

If a `/pages` folder exists, Markoa should add a route for each page there, such as `users/details` and `users/feed`. All pages for the app share the root page data by default, however the sub-pages can extend or override this data by a `page/pages` object where each entry is the data specific to a subpage. In short, the page found at `page/pages/details` will get the data from `page` extended (and potentially overwritten) by `page/pages/details`.

```js
module.exports = {
  page: {
    name: 'users',
    title: 'Users',
    pages: {
      details: {
        title: 'Detailed Users',
        caption: 'Your favorites'
      },
      feed: {
        // ...
      }
    }    
  },
}
```

When the page `users/details` is rendered, it will get the data:

```js
{
  name: 'users',
  title: 'Detailed Users', // overrides
  caption: 'Your favorites' // extends
}
```

### App Meta data and inheritance

An app folder can contain a `meta.js` file to define meta data for the app.

```js
module.exports = {
  type: 'item', // or: home, list, ...
  form: true, // if it contains a form to edit the item
  page: {
    // type: 'item',
    app: 'item' // app to use for page if no page found here
  },
  data: {
    // type: 'item',
    // app: 'item' app to use as data source if no data here
  }
}
```

#### Inheritance and reuse

The meta data can be used to indicate which apps to fall back to (inherit from) for the template and data used so as to reuse from other apps and thus minimize duplication.

#### Stats

The meta data can also be used to gather stats about the app in aggregate, f.ex to list all the apps that display lists, have forms etc.

### Using App inheritance

Let's say we have global data:

```js
lists: {
  projects: [...],
  teams: [...]
}
```

Ideally we would like to have this global data available for reference but also to reuse this data at the app level as local data. To enable this, each local `/data` folder has a `global.js` which exports all the global data which can then be referenced locally as follows.

```js
var _ = require('./global');
module.exports = {
  // See global data, lists/projects
  // out.global.lists.projects
  page: {
    name: 'projects',
    title: 'Projects',
    list: _.lists.projects;
  }
}
```

So here we set up a local generic `list` to point to the global data `list.projects`. This can then be passed to whatever list generator which knows how to populate and render a given type of list. Magic!

Using this approach, any app which which displays a model or list using the same renderer, can be set up to inherit from a generic app which handles it.

```js
module.exports = {
  type: 'list',
  page: {
    app: 'list'
    pages: {
      details: {
        app: 'list/details'
      },
      feed: {
        app: 'list/feed'
      }      
    }
  }
}
```

Since this pattern is so common you can do the shorthands:

```js
app: 'list'
pages: {
  details: {
    app: ':details'
  },
```

Or even shorter:

```js
app: 'list'
pages: 'list' // or 'inherit' to use same inheritance as app
```

### App

An `App` is simply an Object with a specific structure that defines where or how specific "endpoints" of the app can be retrieved, such as the main page template and the page state (data) of the app. An app can also contribute to the global state via the special `$global` entry. There are several ways to create an app:

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

An `/apps` folder being mounted, can contribute to the global state of the app container where it mounts. You should have a file `apps/_global/data.js` or more typically `apps/_global/data/index.js` which returns an Object or a function of the form `function(name, config)`, where name is the name of the current app trying to access global state and config is a config object.

Each app on its own should also have a state, such as for the `index` app, either: `apps/index/data.js` or `apps/index/data/index.js` adhering to the same rules as for global state.

For more advanced scenarios, you can even provide different state for each environment: `development`, `test` and `production`, simply by having top level data object keys for each such environment you wish to support. You can provide a `default:` key for default state for environment not defined, if none of these keys are found it will default to retrieve the entire state (data).

Local testing
-------------

Run `npm link` from markoa root folder to link the package.

Then from an app or appContainer that uses markoa, use `npm link markoa` to link the dependency, which creates a symbolic link in your `node_modules` pointing to your local markoa package.

Now run `npm install` from your app ;)

### Widget dependency management for client app

See the new `lib/components` folder

Components can generate registries of Components for the app (global, per app). It can also be used to uncover which tags are in fact Widgets and store them in a `widgets.json` file for each app. This can file can then be used as input to generate an `[app-name].browser.json` for each app with all widget dependencies *auto-magically* pre-configured!!!

### Server Templates

The `lib/templates` folder contains a script which can compile Marko templates into Liquid templates for use on the server.
