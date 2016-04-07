"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

describe("Basics", function() {
  it("should check many types and return true", function() {
    var arr = [1, 2, 3];
    var str = "str";

    expect(type.checks([Array, arr], [String, str])).to.be.true;
  });

  it("should check many types and throw an error", function() {
    var arr = [1, 2, 3];
    var curry = function() {
      type.checks([Array, arr], [String, arr]);
    }
    
    expect(curry).to.throw("TypistError: Expected " + arr + " to be of type String");
  });

  it("should type check a function and its inputs", function() {
    var makeArray = type(Array, function(input, foo, bar) {
      type.checks([Array, input], [String, foo], [Number, bar]);
      input.push(foo, bar);
      return input;
    });

    expect(makeArray([], "1", 2)).to.eql(["1", 2]);
  });

  it("should type check a function and its inputs and return error", function() {
    var makeArray = type(Array, function(input, foo, bar) {
      type.checks([Array, input], [String, foo], [Number, bar]);
      input.push(foo, bar);
      return input;
    });

    var curry = function() {
      makeArray([], 1, 2);
    };

    expect(curry).to.throw("TypistError: Expected " + 1 + " to be of type String");
  });
});
