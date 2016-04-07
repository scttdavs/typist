"use strict"; 

var chai = require("chai");
var expect = chai.expect;
var typist = require("../typist");

describe("Basics", function() {
  it("should check a type", function() {
    var arr = [1, 2, 3];
    var str = "type";

    var curry = function() {
      typist.arr(str);
    }

    expect(typist.arr(arr)).to.equal(arr);
    expect(curry).to.throw("TypistError: Expected variable to be of type Array");
  });
});
