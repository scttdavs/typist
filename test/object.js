"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var object = {};
var str = "type";

describe("Objects", function() {
  it("should check a type and return the value", function() {
    expect(type.object(object)).to.equal(object);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.object("str");
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type Object");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.object(str)).to.be.false;
    expect(type.is.object(object)).to.be.true;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(Object, function(input) {
      return input;
    });
    
    expect(test(object)).to.be.equal(object);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(Object, function(input) {
      return input;
    });
    var curry = function() {
      test("");
    }
    
    expect(curry).to.throw("TypistError: Expected a return value to be of type Object");
  });
});

