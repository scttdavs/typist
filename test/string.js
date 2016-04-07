"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var typist = require("../typist");

describe("Strings", function() {
  it("should check a type and return the value", function() {
    var str = "str";
    expect(typist.string(str)).to.equal(str);
  });

  it("should check a type and return an error", function() {
    var arr = [1, 2, 3];
    var curry = function() {
      typist.string(arr);
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type String");
  });

  it("should check a type and return a boolean", function() {
    var arr = [1, 2, 3];
    var str = "type";
    expect(typist.is.string(arr)).to.be.false;
    expect(typist.is.string(str)).to.be.true;
  });

  it("should 'annotate' a function return type", function() {
    var test = typist(String, function(input) {
      return input;
    });
    
    expect(test("str")).to.be.eql("str");
  });

  it("should 'annotate' a function return error", function() {
    var test = typist(String, function(input) {
      return input;
    });
    var curry = function() {
      test([]);
    }
    
    expect(curry).to.throw("TypistError: Expected a return value to be of type String");
  });
});

