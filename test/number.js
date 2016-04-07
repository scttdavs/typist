"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var num = 5;
var str = "type";

describe("Numbers", function() {
  it("should check a type and return the value", function() {
    expect(type.number(num)).to.equal(num);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.number("str");
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type Number");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.number(str)).to.be.false;
    expect(type.is.number(num)).to.be.true;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(Number, function(input) {
      return input;
    });
    
    expect(test(num)).to.be.equal(num);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(Number, function(input) {
      return input;
    });
    var curry = function() {
      test([]);
    }
    
    expect(curry).to.throw("TypistError: Expected a return value to be of type Number");
  });
});

