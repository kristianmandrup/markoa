module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  console.log('resolved.apps', resolved.apps);
  return {
    apps: resolved.apps.retrieve(),
  };
};
