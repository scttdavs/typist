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

  // checks a single type
  var check = function(type, value) {
  	return (value instanceof type || 
            typeof value === type.name.toLowerCase() || 
            Object.prototype.toString.call(value) === "[object " + type.name + "]");
  };

  // pass a test value and type, it checks the value and either returns it or a TypistError
  var checker = function(test, value, type) {
  	if (test) {
  		return value;
  	} else {
  		throw new TypistError("TypistError: Expected variable to be of type " + type);
  	}
  };


  // type check a functions return value
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

  typist.allTypes = [
  	String,
  	Number,
  	Function,
  	Boolean,
  	Array,
  	Date,
  	RegExp,
  	Object,
  	Error
  ];

  // checks a single type, see above
  typist.check = check;

  // checks multiple types
  typist.checks = function() {
  	var args = Array.prototype.slice.call(arguments);
  	args.forEach(function(value) {
  		if (!typist.check(value[0], value[1])) {
  			throw new TypistError("TypistError: Expected " + value[1] + " to be of type " + value[0].name);
  		}
  	});
  	return true;
  }

  // Main type checking stuff

  typist.is = {};

  typist.allTypes.forEach(function(type) {
  	var name = type.name.toLowerCase();
  	if (!typist.is[name]) {
  		typist.is[name] = function(test) {
	  		return typist.check(type, test);
	  	};
  	}

  	typist[name] = function(test) {
  		return checker(typist.is[name](test), test, type.name);
  	};
  });

  // Chaining together for all in one solution

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
});
