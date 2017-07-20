'use strict'

var expect = require('chai').expect
var baseConvert = require('../src/index.js')
const random = require('random-js')()

describe ('#baseConvert', function () {
  it ('encode should return a string', function() {
        var result = baseConvert.encode(1234)
        expect (result).to.be.string
  })

  it ('decode() should return a number', function() {
        var result = baseConvert.decode('1234')
        expect (result).to.be.a('number')
  })

  it ('Default encoding alphabet should be unique', function() {
        var result = baseConvert.isUnique()
        expect (result).to.be.true
  })

  it ('User defined alphabet ("abcdefghijklm") should be unique', function() {
        var result = baseConvert.isUnique('abcdefghijklm')
        expect (result).to.be.true
  })

  it ('Non-unique alpabets ("aabcdefghijklm") should fail', function() {
        var result = baseConvert.isUnique('aabcdefghijklm')
        expect (result).to.be.false
  })

  it ('getBase() should return a number', function() {
        var result = baseConvert.getBase()
        expect (result).to.be.a('number')
  })

  it ('getAlphabet() should return a string', function() {
        var result = baseConvert.getAlphabet()
        expect (result).to.be.string
  })

  it ('setAlphabet() should return current encoding alphabet if no value is passed', function() {
        var result = baseConvert.setAlphabet()
        expect (result).to.be.string
  })

  it ('setAlphabet() should return the new alphabet ("abcdefghijkl") if a new encoding alphabet is passed', function() {
        var result = baseConvert.setAlphabet('abcdefghijkl')
        expect (result).to.be.string
  })

  it ('setAlphabet() should fail if a new encoding alphabet is passed with repeated values ("abcdefgghijkl")', function() {
        expect(() => baseConvert.setAlphabet('abcdefgghijkl')).to.throw(Error)
  })

  it ('isPositive() should accept a positive integer', function() {
        var result = baseConvert.isPositive(33)
        expect (result).to.be.true
  })

  it ('isPositive() should reject a negative integer', function() {
        var result = baseConvert.isPositive(-33)
        expect (result).to.be.false
  })

  it ('randomizeAlphabet() should return a string', function() {
        var result = baseConvert.randomizeAlphabet()
        expect (result).to.be.a.string
  })

  it ('Encode random ID. Decode result. Result of decode should equal random ID. If not, push into errors array. At the end of 5000 iterations, errors.length should equal 0 ', function() {

    var iterations = 5000
    var randomIds = Array.from({length: iterations}, () => random.integer(1000,999999));
    var slugs = []
    var decodedIds = []
    var errors = []
    var matches = []

    for (let i = 0, len = iterations; i < len; i++) {
      slugs.push(baseConvert.encode(randomIds[i]));
      decodedIds.push(baseConvert.decode(slugs[i]));
      var result = (randomIds[i] === decodedIds[i])
      expect (result).to.be.true
    }



  })




})
