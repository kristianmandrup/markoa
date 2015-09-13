module.exports = function(resolved) {
  // TODO: can we reference registered global data function on server or appContainer?
  // console.log('resolved.sub', resolved.sub);
  return {
    sub: resolved.sub.retrieve(),
  };
};
