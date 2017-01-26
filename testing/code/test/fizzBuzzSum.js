const { assert } = require('chai');

const { fizzBuzzSum } = require('../fizzBuzzSum');

describe('fizzBuzzSum', () => {

  it('should work for 0', () => {
    assert.equal(fizzBuzzSum(0), 0);
  });

  it('should work for 1', () => {
    assert.equal(fizzBuzzSum(1), 0);
  });

  it('should add up the first number', () => {
    assert.equal(fizzBuzzSum(3), 3);
  });

  it('should work for 5', () => {
    assert.equal(fizzBuzzSum(5), 3 + 5);
  });

  it('should work for 6', () => {
    assert.equal(fizzBuzzSum(6), 3 + 5 + 6);
  });

  it('should count 15 once', () => {
    assert.equal(
      fizzBuzzSum(15),
      3 + 5 + 6 + 9 + 10 + 12 + 15);
  });

  it('should count two cycles of 15 (30)', () => {
    assert.equal(
      fizzBuzzSum(30),
      3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20 + 21 + 24 + 25 + 27 + 30);
  });

  it('should count two cycles of 15 and 7 (37)', () => {
    assert.equal(
      fizzBuzzSum(37),
      3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20 + 21 + 24 + 25 + 27 + 30 + 33 + 35 + 36);
  });

});
