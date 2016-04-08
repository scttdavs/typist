"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var type = require("../typist");

var date = new Date();
var str = "type";

describe("Dates", function() {
  it("should check a type and return the value", function() {
    expect(type.date(date)).to.equal(date);
  });

  it("should check a type and return an error", function() {
    var curry = function() {
      type.date(str);
    }

    expect(curry).to.throw("TypistError: Expected variable to be of type Date");
  });

  it("should check a type and return a boolean", function() {
    expect(type.is.date(date)).to.be.true;
    expect(type.is.date(str)).to.be.false;
  });

  it("should 'annotate' a function return type", function() {
    var test = type(Date, function(input) {
      return input;
    });
    
    expect(test(date)).to.be.eql(date);
  });

  it("should 'annotate' a function return error", function() {
    var test = type(Date, function(input) {
      return input;
    });
    var curry = function() {
      test(str);
    }

    expect(curry).to.throw("TypistError: Expected a return value to be of type Date");
  });
});
