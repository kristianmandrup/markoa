TODO
====

### Tags and Widgets

`components` folders (for `_global` and [app]) should be subdivided into `tags` and `widgets`. This will also make it much simpler (and faster!) to list and auto-determine widgets used!

### Static assets

-	Global `assets`, app `assets`
-	Global `widgets`, app `widgets`

Should all be added to list of Koa static asset folders on mount!

### Data

Should integrate with FalcorJs, CMS and Translation Manager APIs.

### Security

Use [Lusca](https://github.com/koajs/koa-lusca) :) as used by [KrakenJs](http://krakenjs.com/)

### Liquify marko templates

Convert Marko templates to compatible Liquid templates for use on the server, such as in the CMS. Needs more work and testing/debugging...

See the `lib/templates` folder!
