!function (name, context, definition) {
  if (typeof define == 'function') define(definition);
  else if (typeof module != 'undefined') module.exports = definition();
  else context[name] = definition();
}('typist', this, function () {
  'use strict';

  var typist;

  return typist;
}); // jshint ignore:line
