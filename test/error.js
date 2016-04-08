"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var error = new Error();
var str = "type";

describe("Errors", function() {
  it("should check a type and return the value", function() {
    expect(type.error(error)).to.equal(error);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.error("str");
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type Error");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.error(str)).to.be.false;
    expect(type.is.error(error)).to.be.true;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(Error, function(input) {
      return input;
    });
    
    expect(test(error)).to.be.equal(error);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(Error, function(input) {
      return input;
    });
    var curry = function() {
      test([]);
    }
    
    expect(curry).to.throw("TypistError: Expected a return value to be of type Error");
  });
});

