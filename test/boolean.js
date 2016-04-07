"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var bool = true;
var str = "type";

describe("Booleans", function() {
  it("should check a type and return the value", function() {
    expect(type.boolean(bool)).to.equal(bool);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.boolean(str);
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type Boolean");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.boolean(bool)).to.be.true;
    expect(type.is.boolean(str)).to.be.false;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(Boolean, function(input) {
      return input;
    });
    
    expect(test(bool)).to.be.eql(bool);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(Boolean, function(input) {
      return input;
    });
    var curry = function() {
      test(str);
    }

    expect(curry).to.throw("TypistError: Expected a return value to be of type Boolean");
  });
});
