!function (name, context, definition) {
  if (typeof define == 'function') define(definition);
  else if (typeof module != 'undefined') module.exports = definition();
  else context[name] = definition();
}('typist', this, function () {
  'use strict';

  // Custom typist error for debugging
  var TypistError = function(message) {
  	this.message = message;
  };
  TypistError.prototype = Object.create(TypeError.prototype);

  var typist = function(type, func) {
  	return function() {
  		var result = func.apply(this, arguments);
  		if (result instanceof type || typeof result === type.name.toLowerCase()) {
  			return result;
  		} else {
  			throw new TypistError("TypistError: Expected a return value to be of type " + type.name);
  		}
  	}
  };


  

  // "is" checks

  typist.is = {};

  typist.is.array = function(test) {
  	return Array.isArray(test);
  }

  typist.is.string = function(test) {
  	return test instanceof String || typeof test === String.name.toLowerCase();
  }

  // Main Stuff

  var check = function(test, value, type) {
  	if (test) {
  		return value;
  	} else {
  		throw new TypistError("TypistError: Expected variable to be of type " + type);
  	}
  }

  typist.array = function(test) {
  	return check(this.is.array(test), test, "Array");
  };

  typist.string = function(test) {
  	return check(this.is.string(test), test, "String");
  };



  

  return typist;
}); // jshint ignore:line
