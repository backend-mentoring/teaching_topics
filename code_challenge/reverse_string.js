/** 
 
  Create a function that takes in a string and returns the reverse of the string.

  Obviously, do not use reverse method on the String prototype.

  This is what I expect:

  reverseString("love")
  > "evol"

*/


function reverseString(str){
  return str.split('').reduce((reversed, character) => {
    console.log('reversed', reversed);
    console.log('character', character);
    return character + reversed;
  }, '+')
}

console.log(reverseString('love'));

console.log(reverseString('tacocat'));

