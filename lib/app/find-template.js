module.exports = function (name, config) {
  let appsPath = path.resolve(config.rootPath, 'apps');
  let pagePath = path.join(appsPath, name, 'page');
  let pageTemplateName = name + '.marko';
  return path.join(pagePath, pageTemplateName);
}
