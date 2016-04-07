"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var func = function() {};
var str = "type";

describe("Functions", function() {
  it("should check a type and return the value", function() {
    expect(type.function(func)).to.equal(func);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.function(str);
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type Function");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.function(func)).to.be.true;
    expect(type.is.function(str)).to.be.false;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(Function, function(input) {
      return input;
    });
    
    expect(test(func)).to.be.eql(func);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(Function, function(input) {
      return input;
    });
    var curry = function() {
      test(str);
    }

    expect(curry).to.throw("TypistError: Expected a return value to be of type Function");
  });
});
