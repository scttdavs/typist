"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var arr = [1, 2, 3];
var str = "type";

describe("Array", function() {
  it("should check a type and return the value", function() {
    expect(type.array(arr)).to.equal(arr);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.array(str);
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type Array");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.array(arr)).to.be.true;
    expect(type.is.array(str)).to.be.false;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(Array, function(input) {
      return input;
    });
    
    expect(test([])).to.be.eql([]);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(Array, function(input) {
      return input;
    });
    var curry = function() {
      test(str);
    }

    expect(curry).to.throw("TypistError: Expected a return value to be of type Array");
  });
});
