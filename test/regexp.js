"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var regex = /abcd/;
var str = "type";

describe("Regular Expressions", function() {
  it("should check a type and return the value", function() {
    expect(type.regexp(regex)).to.equal(regex);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.regexp("str");
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type RegExp");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.regexp(str)).to.be.false;
    expect(type.is.regexp(regex)).to.be.true;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(RegExp, function(input) {
      return input;
    });
    
    expect(test(regex)).to.be.equal(regex);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(RegExp, function(input) {
      return input;
    });
    var curry = function() {
      test([]);
    }
    
    expect(curry).to.throw("TypistError: Expected a return value to be of type RegExp");
  });
});

