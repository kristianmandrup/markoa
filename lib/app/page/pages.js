module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  console.log('resolved.pages', resolved.pages);
  return {
    sub: resolved.pages.retrieve(),
  };
};
