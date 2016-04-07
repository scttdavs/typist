!function (name, context, definition) {
  if (typeof define == 'function') define(definition);
  else if (typeof module != 'undefined') module.exports = definition();
  else context[name] = definition();
}('typist', this, function () {
  'use strict';

  var commonTypes = [
  	String,
  	Number,
  	Function,
  	Boolean
  ];

  // Custom typist error for debugging
  var TypistError = function(message) {
  	this.message = message;
  };
  TypistError.prototype = Object.create(TypeError.prototype);

  // checks a single type or list of types

  var check = function(type, value) {
  	return (value instanceof type || typeof value === type.name.toLowerCase());
  };

  var checker = function(test, value, type) {
  	if (test) {
  		return value;
  	} else {
  		throw new TypistError("TypistError: Expected variable to be of type " + type);
  	}
  }

  var typist = function(type, func) {
  	return function() {
  		var result = func.apply(this, arguments);
  		if (check(type, result)) {
  			return result;
  		} else {
  			throw new TypistError("TypistError: Expected a return value to be of type " + type.name);
  		}
  	}
  };

  typist.check = check;

  typist.checks = function() {
  	var args = Array.prototype.slice.call(arguments);
  	args.forEach(function(value) {
  		if (!typist.check(value[0], value[1])) {
  			throw new TypistError("TypistError: Expected " + value[1] + " to be of type " + value[0].name);
  		}
  	});
  	return true;
  }

  // Main Stuff

  typist.is = {};

  typist.is.array = function(test) {
  	return Array.isArray(test);
  }

  typist.array = function(test) {
  	return checker(this.is.array(test), test, "Array");
  };

  commonTypes.forEach(function(type) {
  	var name = type.name.toLowerCase();
  	typist.is[name] = function(test) {
  		return typist.check(type, test);
  	};

  	typist[name] = function(test) {
  		return checker(typist.is[name](test), test, type.name);
  	};
  });

  // Chaining

  var chaining = {
  	returns: function(type) {
  		this.type = type;
  		return this;
  	},
  	takes: function() {
  		var args = Array.prototype.slice.call(arguments);
  		this.types = args;
  		return this;
  	},
  	definition: function(func) {
  		var ret = function() {
  			var args = Array.prototype.slice.call(arguments);
  			if (this.types) {
  				var builtTypes = [];
  				args.forEach(function(value, i) {
  					builtTypes.push([this.types[i], value]);
  				}.bind(this));
	  			typist.checks.apply(this, builtTypes);
	  		}

  			return func.apply(this, arguments);
  		}.bind(this);

  		return this.type ? typist(this.type, ret) : ret;
  	}
  };

  typist.returns = function() {
  	var ret = Object.create(chaining);
  	return ret.returns.apply(ret, arguments);
  };

  typist.takes = function() {
  	var ret = Object.create(chaining);
  	return ret.takes.apply(ret, arguments);
  };

  return typist;
}); // jshint ignore:line
