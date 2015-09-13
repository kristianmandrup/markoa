// https://github.com/racker/node-elementtree
/*jslint node: true */
'use strict';

var et = require('elementtree');
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

function exprReplacer(match, p1) {
    return `{{${p1}}}`;
}

var Tags = function() {
  this.tags = [];
};

module.exports = Tags;

function transform(value) {
  var val = value.replace(/\${([a-zA-Z\.]*)}/, exprReplacer);
  val = val.replace(/\$([a-zA-Z\.]*)/, exprReplacer);
  return val;
}

Tags.prototype = {
  add: function(name) {
    var tag = this.tags.length ? this.addSub(name) : this.addRoot(name);
    this.current = tag;
    this.tags.push(tag);
    return this;
  },
  addRoot: function(name) {
    var el = element(name);
    this.root = el;
    return el;
  },
  addSub: function(name) {
    var el = subElement(this.current, name);
    el.parentElem = this.current;
    return el;
  },
  close: function() {
    this.current = this.current.parentElem;
    return this;
  },
  set: function(name, value) {
    if (this.current) {
      this.current.set(name, transform(value));
    }
    return this;
  },
  text: function(data) {
    if (this.current) {
      this.current.text = transform(data);
    }
    return this;
  },
  toString: function(options) {
    options = options || {};
    var root = this.root;
    return new ElementTree(root).write({'xml_declaration': false});
  }
};
