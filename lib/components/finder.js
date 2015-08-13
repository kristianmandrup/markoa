module.exports = function(tagName, places) {
  if (tagName.match(/widget/)) return './my-widget.js';
  return false;
}
