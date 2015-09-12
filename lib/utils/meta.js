module.exports = function readMeta(appsPath) {
  try {
    let metaPath = path.join(appsPath, 'meta');
    return require(metaPath);
  } catch (e) {
    return {};
  }
};
