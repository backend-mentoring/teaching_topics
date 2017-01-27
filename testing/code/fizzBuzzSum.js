// http://www.mathsisfun.com/algebra/sequences-sums-arithmetic.html
// where a = n, simplify
const arithmeticSum = (n, d) => (n / 2) * (n + 1) * d;

const sumMultiplesUntil = (m, n) => arithmeticSum(Math.floor(n / m), m);

const fizzBuzzSum = n =>
  // add up the 3s and 5s
  sumMultiplesUntil(3, n) + sumMultiplesUntil(5, n) -
  // but only count the 15s once
  sumMultiplesUntil(15, n);

module.exports = { fizzBuzzSum };
