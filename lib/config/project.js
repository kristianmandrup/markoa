module.exports = {
  apps: {
    folder: 'apps',
    global: {
      folder: '_global',
      path: 'apps/_global',
      components: {
        folder: 'components',
        path: 'apps/_global/components'
      },
      data: {
        folder: 'data',
        path: 'apps/_global/data'
      },
      layouts: {
        folder: 'layouts'
        path: 'apps/_global/layouts'
      }
    },
  },
  app {
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
      folder: 'page'
      assets: {
        folder: 'assets',
        path: 'page/assets'
      }
    }
  }
}