# Mounting apps

Rapid Render supports mounting individual apps (an SPA) to an app container.

Rapid Render will shortly consist of the following modules (packages):
- rr-app-container
- rr-base-app
- rr-server
- rr-state
- rr-utils

## RR Server

The RR server is a standalone configuration of a Koa server, with port, middleware, basic routing and such...

## RR  App Container

The appContainer is a container for mounting individual apps. When an app is mounted, a route is created on the
RR server for that name with the app state and using the apps findTemplate fucntion to render the marko template.

## RR state

## RR util

## Creating and mounting an SPA

An SPA application such as account-app will include rr-base-app to access utility methods to mount the app to
an app container and to help configure/load the app state.

It should have an app.js file in the root, which is used for testing the app being mounted in an app container.
This way the dev can test the app, by mounting it as a single route in a kind of "test environment" not polluted by other apps.

## Custom Tags

Each SPA can have its owwn custom tags, following the conventions, ie. marko-taglibs.js file and a folder for each tag:

```
views/page
   /partials
   /components
   page.marko
   page.browser.json
   marko-taglibs.json
   page-layout.marko
```

## Full application

```
forvetbet-app
  node_modules
    account-app
      views
        ...
    casino-app
      ...
    ...
  marko-taglibs.json
```

The full app will include each SPA via npm dependencies.

```
var appContainer = require('rr-app-container'); // should include rr-server
var accountApp = require('account-app');
...

appContainer.init(koaServer);
account.mountIn(appContainer);
appContainer.start(); // will run koaServer.start()
```

The cool thing is, that when an SPA page such as account.marko wants to use a general custom tag, it "just works".
This is because, taglibs will try to find the marko-taglibs.json by going up the directory tree.
So the marko-taglibs.json just needs to be in the container app and from there reference where to find the general taglibs shared for all SPAs.
This is why we must move away from partials!!! Partials dont allow this flexibility/modularity.

The only "problem" is the layouts, which for now need to be either locally accessible or referenced via a long path up...
We therefore recommend having a page layout for each SPA module, even if it means duplication.
