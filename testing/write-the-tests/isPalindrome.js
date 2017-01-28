const isPalindrome = (origWord) => {
    var inputArray = origWord.split("");
    var reversed = inputArray.reverse().join("");
  return reversed === origWord;
}

module.exports = isPalindrome;
