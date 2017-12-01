
/**
 * Create a function that determines whether a string is a palindrome
 * This is the expected output:
 * isPalindrome('tacocat')
 * > true
 * isPalindrome('beans')
 * > false
 * Try it with your reverseString function and then try to see if you can do it without reversing anything.
 * This might be a more roundabout way of solving the problem but it shows your knowledge of your tools and the kind of thinking that they are looking for
 */



function reverseString(str){
  return str.split('').reduce((reversed, character) => {
    return character + reversed;
  }, '')
}

// function isPalindrome(str){
  //   const reversed = reverseString(str);
  //   return reversed === str;
  // }
  
function isPalindrome(str){
  let middleIndex = Math.floor(str.length / 2);
  
  let halfString = str.split('').slice(0, middleIndex);
  return halfString.every((character, i) => {
    console.log('i', i);
    console.log('character', character);
    console.log(str.length - i - 1);
    return character === str[str.length - i - 1]; 

  });
}

console.log(isPalindrome('tacocat'));
console.log('================');
console.log(isPalindrome('tacotown'));


/**
 * Homework!
 * 
 * Find out how many words in the English language are palindromes
 * 
 * There is a file on your Mac (if you have a mac) at the path provided. Use node.js to read this file, and figure out the number of palindromes that there are in English and log it to the console.
 */


