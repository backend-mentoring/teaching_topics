# Regular Expressions (AKA regex, regexp)

Regular Expressions are a language for describing search patterns. The concept
comes from the field of formal language theory through the work of Stephen Cole
Kleene in the 1950s. Since then regular expressions have been [implemented many
times] (https://stackoverflow.com/questions/4644847/list-of-all-regex-implementations)
with extended features and expressiveness. Due to this variety, it's rather
difficult to come up with a comprehensive definition of regular expressions.

# The JavaScript Implementation

- [Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

## Creating a Regex

Literal Notation:

```javascript
var re = /ab+c/;
```

Constructuctor Notation:

```javascript
var re = new RegExp('ab+c');
```

## Now What?

| Method  | Description                                                                                                                      |
|---------|----------------------------------------------------------------------------------------------------------------------------------|
| exec    | A RegExp method that executes a search for a match in a string. It returns an array of information or null on a mismatch.        |
| test 	  | A RegExp method that tests for a match in a string. It returns true or false.                                                    |
| match   | A String method that executes a search for a match in a string. It returns an array of information or null on a mismatch.        |
| search  | A String method that tests for a match in a string. It returns the index of the match, or -1 if the search fails.                |
| replace | A String method that executes a search for a match in a string, and replaces the matched substring with a replacement substring. |
| split   | A String method that uses a regular expression or a fixed string to break a string into an array of substrings.                  |

## But What *is* a Regex?

Patterns are composed of **literals** which are characters that represent
themselves, and **metacharacters** which have special interpretation.

For a comprehensive list of metacharacter meaning: [RTFM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_meaning_in_regular_expressions)

For a good cheatsheet and examples, take a look at [regexr](http://regexr.com/).

# Cool Resources

- [regexr](http://regexr.com/)
- [regex101](https://regex101.com/)
- [regex crossword](https://regexcrossword.com/)

