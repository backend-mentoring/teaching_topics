
const isPalindrome = (origWord) => {
    let inputArray = origWord.split("");
    let reversed = inputArray.reverse().join("");
  return reversed === origWord;
}

module.exports = isPalindrome;
