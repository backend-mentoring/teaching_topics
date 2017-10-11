# Introducing TypeScript

## What is TypeScript? 

TypeScript is an open-source language created by Microsoft just 5 years ago. It comes with a _compiler_ which crunches your TypeScript source code down to ES5 code for you. 

Javascript IS Typescript, but not vice versa. This is the best part about TypeScript. You don't need to know or use all of the features of TypeScript to get started!

### Why static typing?

Static (AKA "strong") typing is a familiar feature to those of you who have messed around with langauges like Java and Go. In a statically typed language, declaring a variable involves declaring what type of data the variable will hold. If you are about to reserve some space in a computer's memory, you have to have some preordained notion of what it will hold, and you have to stick to it.

Most languages that you are all used to, like JavaScript, Ruby, and Python are dynamically typed. You can do something like this:

```javascript
var name = "Vincent";
name = 99;

// or this even

var age; // age is just ¯\_(ツ)_/¯
age = 33; // ok cool its a number now
age = {years: "33", months: 398} // hold my beer
```

Most modern languages went this route because it is easier and more flexible than the rigid old ways of Java and such. TypeScript comes along and basically says… 

![y tho](https://pbs.twimg.com/media/DKBXnDDWAAA67rB.jpg:small)

Seriously, when would you ever need that? 

At what point would it make sense for `age` to be a number and then later, an object? Other code acting on the number, like addition etc will obviously break like this. This is a bug waiting to happen. Collections in JavaScript et al are also capable of including multiple types. But really, when would you need a collection of things that are fundamentally unalike? Practically 90% of programming is about doing stuff to bunches of data. Why would you want a spanner in the works like that? 

Talking to other developers that convinced me to try TypeScript after many long years of dynamically typed languages, most cited the following reason: it's way easier to catch errors at compile time than at runtime.

I balked at TypeScript for a while because I was so frustrated with having to compare some code that actaully runs in the browser and the totally different CoffeeScript source code. Finding bugs was like three dimensional chess. I'd write some code, refresh, and see absolutely nothing happen since the compiler barfed, and any information it gave me was not helpful. Just had to figure it out without a clue like line number or whatever.

Typescript is far and away better. In [this year's Stack Overflow survey](https://insights.stackoverflow.com/survey/2017) developers voted TypeScript as the third most loved and CoffeeScript as the third most dreaded. Rather than making JavaScript look like Python, TypeScript makes JavaScript developers catch bugs as they hit the keys, and it results in more robust, less buggy code. 

Typing is also _optional_. With CoffeeScript, I would have to look up how to do somethign in the docs, paste it into my code, manually translate into actual JavaScript, and hope to god that it transpiles into the same JavaScript that I just copied. If you don't feel like doing things the TypeScript way, you don't have to, as we will see.  

Another cool "feature" if you will is the wicked awesome productivity tools that you get when you embrace static typing. For instance if you have a Person object called `alice`, rather than autocompleting whatever starts with 'a' elsewhere in the file if you start typing `alice.a` it will autocomplete with more sensible things like, oh, I don't know, properties of a Person type that start with 'a'. It just ends up making so much more sense. Visual Studio Code, my favorite editor for nearly a year now, has incredle tooling for TypeScript. It is in fact written in TypeScript!

Another good reason to try TypeScript is that there are some big heavy hitting companies behind it. Microsoft, is of course all about this nice little language that it made. Google is making a huge push to make TypeScript a first-class citizen in all of its web apps. Google worked with Microsoft to make TypeScript _the_ way to write JavaScript in Angular 2+ applications. Slack also has a [great article](https://slack.engineering/typescript-at-slack-a81307fa288d) about their move to TypeScript for its desktop client that I recommend reading.

## Enough, let's get to the code already

First, we need to install TypeScript. Open your terminal and just key in

```shell
npm install -g typescript
# latest version of typescript installs....
tsc --version
# should tell you the version that you have globally
```

`tsc` is the TypeScript Compiler. That's the program that crunches your source code into JavaScript that uncultured browsers can understand. 

## Your first super basic TypeScript program

Let's make a directory to mess around in.

```shell
mkdir hello-typescript
cd hello-typescript
touch main.ts
# open in the one true text editor
code .
```

Now let's just tap in some basic meat and potatoes JavaScript like our ancestors used to write, but let's make the file extension `.ts` instead of `.js`.

```typescript
function sayHi(name){
    console.log("hello" + name);
}
var myName = "Vincent";

sayHi(myName);
```

Nothing to see here, move along people.

Let's compile the code. In your terminal:

```shell
tsc main.ts
```

Now let's see what we have here…. hark! A JavaScript file with the same stuff in it! Success!

Okay I know that isn't impressive but we are just getting started.

To recap, the TypeScript Compiler is the intended audience for the `.ts` file, just as the runtime environment (either node or a browser basically) is the audience for JavaScript.

## Strong typing in action

I am going to start moving the examples into ES6+ since TypeScript incorporates some of the same stuff into it's compiler, kind of like Babel. By default, TypeScript comiles to ES5 so you can be sure that any browser basically can deal with your resulting JavaScript.

Let's try messing around with types.

```typescript
let v;
// hover over a to see the type
let str = "thermidor";

```

Now hover over the declaration `str` and witness.

TypeScript and VS code infers that the variable str has the type of string. Note the comma.

Now throw in:

```typescript
str = 999;
```

Behold the squiggly line of _catching errors without having to actually run your code_.

Even if you were using nano or some other text editor that doesn't help you much, the TypeScript compiler will flag errors like this at compile time. With our squiggly line still there, go ahead and run:

```shell
tsc main.ts
```

The compiler will put out the same error we saw in the the text editor. Very helpful, but it also faithfully compiles a `main.js` file anyway! If you look at the JavaScript code that results, you will see some old school ES5 code. The benefit is that you were at least warned that something was screwy. As a consenting adult, you can carry on with your bug-friendly code and deal with the consequences later.

If you do the same skullduggery with the variable `v`, which you might remember, TypeScript regards as a free for all type of `any`, the tsc will not complain.

### Let's be more civilized and declare types ahead of time

Let's edit that file so it actually uses TypeScript's features and declare some variables with types.

```typescript
let v: string;

let str: string = "thermidor";

str = 55;
```

The colon in TypeScipt can be used to declare the type that will be assigned to a variable whether it is initialized with data or not. If you try to compile this, you will be successful again, but as a conscientious programmer, why would you just carry on with errors in your code comilation like that?

You can also specify the type of numbers in an array like so: 

```typescript
let ids: number[] = [1,2,3];
```

You can always emphatically set something to `any` type as well. 

#### Enums

TypeScript brings finite sets or "enums" to JavaScript as well. For example: 

```typescript
enum LanguageCodes {English = "EN", "Spanish" = "ES", German = "DE"};

let userLanguage = LanguageCodes.E //watch as intellisense gives me a dropdown since Enums signify that it has to be one of these.
```

Using enums lets you rely less on primitive types to get things done!



## Type assertions

The compiler and intellisense is basically the same thing.

Look at how cool this is in VS Code:

```typescript
let name = "Vincent"; // string duh

let hasLongName = name. // nice! it's autocompleting with properties of type string.

```

Let's say you need to declare a type later on after initializing it with the "any type".

```typescript
let age; //implicitly 'any'
age = 33;
age. // nothing pops up this way

(<number>age). //dropdown city baby.

//or 
(age as number).toString(); //for example
```

In your application you will come across needs that basic typescript hasn't provided for, of course. Like "User", "Post", "Todo", "Friendship" etc. You can declare types for these, sort of like how you create classes in real object oriented programmign languages.



## Custom Interfaces

When a thing is like a coherent discreet thing, we naturally tend to group the properties thereof as a JavaScript object. This is especially handy when writing a function with parameters:

```javascript
// crappy way
let name = "vincent";
let age = 33;
let location = "Brooklyn";

let introduce = (name, age, location) =>{
    console.log(`Hi, I am ${name} from ${location}, I am ${age} years old.`);
}

introduce(name, age, location);
// better way

let me = {
  name:"vincent",
  age: 33,
  location: "Brooklyn"
}

let introduce = (person) =>{
    console.log(`Hi, I am ${person.name} from ${person.location}, I am ${person.age} years old.`);
}

introduce(me);

```



Interfaces are much better because unlike a free flowing object, you can define the shape of it and the types therein. 

Try this:

```typescript
interface Person {
    name: string,
    age: number,
    location: string
}

let introduce = (person: Person) =>{
    console.log(`Hi, I am ${person.name} from ${person.location}, I am ${person.age} years old.`);
```

Sometimes you will want to reach for a class, sometimes for an interface.  That example above shows some cohesion between the interface and the function. That function could be a method on a person class instead. Here is the same thing as a class: 

```typescript
class Person{
  constructor(name: string, age: number, location: string){
      this.name = name
      this.age = age
      this.location = location
    }
  introduce () =>{
    console.log(`Hi, I am ${this.name} from ${this.location}, I am ${this.age} years old.`);
}

me = new Person('vincent', 33, 'brooklyn');

me. // look at the intellisense!


```



If you want to make constructor parameters optional, you can add a `?` right after the variable. You can also make some fields unsettable after like so

```typescript
class Person{
  constructor(name?: string, age?: number, location?: string){
      this.name = name
      this.age = age
      this.location = location
    }
  introduce () =>{
    console.log(`Hi, I am ${this.name} from ${this.location}, I am ${this.age} years old.`);
}


me = new Person('vincent', 33, 'brooklyn');



```

All attributes of the class are public (gettable and settable outside of the class itself) unless you prefix the constructor param with `private`.

