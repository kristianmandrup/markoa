/*jslint node: true */
'use strict';

var htmlparser = require('htmlparser2');
var Tags = require('./tags');

// &&	and
// ||	or
// ===	eq
// !==	ne
// <	lt
// >	gt
// <=	le
// >=	ge
var operatorMap = {
  'and': '&&',
  'or': '||',
  'eq': '===',
  'ne': '!==',
  'lt': '<',
  'gt': '>',
  'le': '<=',
  'ge': '>='
};


function normalize(test) {
  for (var key in Object.keys(operatorMap)) {
    test = test.replace(key, operatorMap[key]);
  }
  return test;
}

var clientOnlyTags = [
  'html-comment',
  'compiler-options',
  'def',
  'invoke',
  'lasso',
  'lasso-head',
  'lasso-body',
  'browser-refresh'
];

var openTagHandler = function(add) {
  var fns = {
    'for': function(attribs) {
      add(`{% for ${attribs.each} %}`);
    },
    'if': function(attribs) {
      var test = normalize(attribs.test);
      var stmt = (test[0] === '!') ? 'unless' : 'if';
      add(`{% ${stmt} ${test} %}`);
    },
    'else-if': function(attribs) {
      add(`{% elsif ${attribs.test} %}`);
    },
    'else': function() {
      add('{% else %}');
    },
    'assign': function(attribs) {
      // var="name" value="
      add(`{% assign ${attribs.var} = ${attribs.value} %}`);
    },
    'var': function(attribs) {
      // var="name" value="
      add(`{% assign ${attribs.name} = ${attribs.value} %}`);
    }
  };

  for (var tag of clientOnlyTags) {
    fns[tag] = function() {};
  }
  return fns;
};

var closeTagHandler = function(add) {
  var fns = {
    'for': function() {
      add('{% endfor %}');
    },
    'if': function() {
      add('{% endif %}');
    }
  };

  for (var tag of clientOnlyTags) {
    fns[tag] = function() {};
  }
  return fns;
};

function createTagHandlers(tags) {
  function add(expr) {
    tags.add('liquid').set('expr', expr).close();
  }

  return {
    openTag: openTagHandler(add),
    closeTag: closeTagHandler(add),
  };
}

var markoAttributes = require('./marko-attributes');

function isMarkoAttribute(name) {
  return markoAttributes.indexOf(name) >= 0;
}

// TODO
// for="item in items"
// for="i from 0 to 10 step 2"
// for="(name,value) in settings"
// if="data.showHeader !== false"

function markoAttributeHandler(tags) {
  return function(name, value) {
    switch (name) {
      case 'for': return tags.add(name, {each: value});
      case 'if': return tags.add(name, {test: value});
    }
  };
}
function createAttribHandler(tags) {
  var markoAttribute = markoAttributeHandler(tags);
  return function(key, attribs) {
    if (isMarkoAttribute(key)) {
      markoAttribute(key, attribs[key]);
    } else {
      tags.set(key, attribs[key]);
    }
  };
}

function isFun(fun) {
  return typeof fun === 'function';
}

module.exports = function(markoTpl, cb) {
  var tags = new Tags();
  var handlers = createTagHandlers(tags);
  var handleAttrib = createAttribHandler(tags);

  var parser = new htmlparser.Parser({
      onopentag: function(name, attribs){
        var open = handlers.openTag[name];
        if (isFun(open)) {
          open(attribs);
        } else {
          tags.add(name);
          if (!attribs) {
            return;
          }
          for (var key of Object.keys(attribs)) {
            handleAttrib(key, attribs);
          }
        }
      },
      onclosetag: function(name, attribs) {
        var close = handlers.closeTag[name];
        return isFun(close) ? close(attribs) : tags.close();
      },
      ontext: function(text){
        tags.text(text);
      },
      onend: function(){
        cb(tags);
      }
  }, {decodeEntities: false});
  parser.write(markoTpl);
  parser.end();
};
