module.exports = function() {
  return {
    store: {},
    add: function(tagName, file) {
      this.store[tagName] = file;
    }
  }
}
