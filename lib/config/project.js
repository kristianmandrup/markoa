module.exports = {
  apps: {
    folder: 'apps',
    global: {
      folder: '_global',
      path: 'apps/_global',
      assets: {
        folder: 'assets',
        path: 'apps/_global/assets'
      },
      components: {
        folder: 'components',
        path: 'apps/_global/components',
        tags: {
          folder: 'tags',
          path: 'apps/_global/components/tags'
        },
        widgets: {
          folder: 'widgets',
          path: 'apps/_global/components/widgets'
        }
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
