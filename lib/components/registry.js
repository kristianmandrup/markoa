var Registry = function() {
  return {
    registry: {}
  }
}

Registry.prototype.add = function(tagName, file) {
  this.registry[tagName] = file;
}

module.exports = Registry;
