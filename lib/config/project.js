module.exports = {
  apps: {
    folder: 'apps',
    global: {
      folder: '_global',
      path: 'apps/_global',
      assets: {
        folder: 'assets'
      },
      components: {
        folder: 'components',
        path: 'apps/_global/components'
      },
      data: {
        folder: 'data',
        path: 'apps/_global/data'
      },
      layouts: {
        folder: 'layouts',
        path: 'apps/_global/layouts'
      }
    },
  },
  app: {
    assets: {
      folder: 'assets'
    },
    components: {
      folder: 'components'
    },
    data: {
      folder: 'data'
    },
    layouts: {
      folder: 'layouts'
    },
    page: {
      folder: 'page',
      dependencies: {
        folder: 'dependencies',
        path: 'page/dependencies'
      }
    }
  }
}
