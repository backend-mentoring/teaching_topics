# Sorting Algorithms with Test Driven Development

Today we are going to try some test-driven development (TDD) with Jest and plain old vanilla JavaScript. 

Please take this lesson as an _experience_ with a process rather than a proscribed best practice. TDD is a somewhat controversial topic. Some developers feel like its the only way to code, others see it as too time consuming or counter intuitive. Whether you adopt this habit really comes down whether it works for you or your team and the processes that your organization cares about. 

Another disclaimer is that [TDD is not testing](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html). You are testing your code always, whether you adopt TDD or not. We test because if we didn't we would go completely insane. I personally prefer to write my tests after the thing is working and often it helps me see edge cases that I didn't account for or potential bugs. I can update unrelated code or dependencies tomorrow with the confidence that the code that I wrote today won't break, or at least if there was a breaking change we would know it before we deploy. Manual QA of your entire application gets really boring really quickly. Running your tests, not so much.

## The TDD flow

We are going to perform a unit test for a sorting algorithm, then incorporate that into an Express API and do an integration test on that endpoint. A unit test tests individual functions in isolation. These are generally seen as inferior to the much more expensive integration tests or UI tests, which make sure that everything that you would expect a user to be able to do can still be done and result in the correct outcome.

In the future I would like to introduce [Puppeteer](https://github.com/GoogleChrome/puppeteer), which is a Node package for controlling a headless Chrome browser for UI tests, but today we will keep it stupidly simple.

In TDD, your tests drive your code design, not the other way around. Rather than writing working software and retroactively writing tests to uncover bugs (and prevent future bugs from slipping by unnoticed), you write the tests first.

This is helpful for many because the time that you invested in describing your software leaves you with a helpful todo list for what to look out for when you actually code. 

You look at the requirements for the feature that you are working on and translate that into code, run the tests to just confirm that your testing code is free of syntax errors. They should all be failing in such a way that the output clearly tells you what to do next. We call this the **red** stage of TDD. 

Next, you write _only_ the necessary code to get that test to pass. This incremental approach makes sure that every branch of your code is tested and covers edge cases. It also gives your teammates a legible list of things that the program is supposed to do. Sometimes we call tests 'specs' short for specifications. Your tests are living breathing documentation as well as a guard against bugs. We call this the **green** stage. 

Now that you have solid tests in place, you can freely **refactor** your code with abandon, knowing that any regressions that you unknowingly introduce will be caught. You can improve your code without fear. 

## Our assignment

You have a client that needs some arrays of numbers sorted. This kind of thing seems to happen a lot in the world of business. 

We are going to declare some tests to define done. and make sure that our sorting algorithm is producing the correct output. 

Let's write the tests first and set up a skeleton for testing. 

```shell
% mkdir sorter && cd sorter
% npm init # (press enter a bunch of times)
% git init
% npm i --save express body-parser
% npm i --save-dev jest supertest
% touch sorter.js test.js .gitignore
```

Jest looks for files named with the pattern `*test.js` by default.

Let's just set up the skeleton with our sorting function in index.js and the test block in test.js:

### sorter.js

```javascript
const sorter = ((arr) => {
  return arr;
});

module.exports = sorter;
```

### sorter.test.js



Just to make sure that we didn't insert any errors, let's insert a smoke test as a sanity check:

```javascript
describe('sanity check', () => {
  it('can do obvious stuff', () => {
    expect(2 + 2).toBe(4);
  });
});
```



This pattern will become very familiar. `describe` is part of the [Jest Domain Specific Language (DSL)](https://facebook.github.io/jest/docs/en/using-matchers.html). It expects a string as a description, then a function, which is anonymous in this case. Test does the same thing. `expect` takes in any statement, in this case `2 + 2`. `toBe` is also part of the DSL. Pretty obvious what it's doing here.

Just a little more configging in `package.json`

```json
  "scripts": {
    "test": "jest --watchAll"
  },
  "jest": {
    "verbose": true
  },
```

This lets us test our code continuously, kind of like hot reloading. Jest keeps an eye on the working directory and re-runs tests every time I save, which is handy for TDD since I can see red or green continuously. The verbose config also makes things more blindingly obvious, which I really like. I'm going to keep that window visible on the left with my code editor on the right.

In my terminal I am going to run:

```shell
% npm test
```

And it looks like everything is in order, we are in a good state.

Right now we will introduce the test case. The definition of 'working'.

I will just declare a constant at the top of the file for our unsorted array, and then a constant for the expected order for it when it is sorted.

This is where you would want to maybe start thinking about edge cases. Assuming a uniform data type, we can throw some curve balls in there such as negative numbers, decimals, expressions, the Number keyword, fractions, etc.

Here is what I came up with:

```javascript
const unsorted = [100.5, -40.7, 40000, -160, 30, 7, (3 / 5), Number((6 / 7).toPrecision(2)), -0, 6e2];
```

Feel free to write your own balderdash numbers. Now I can manually determine the correct sorted order:

```javascript
const sorted = [-160, -40.7, 0, 0.6, 0.86, 7, 30, 100.5, 600, 40000,];
```

I will now complete the test block like so:

```javascript
describe('Bubble sort', () => {
  it('sorts an array', () => {
    expect(sorter(unsorted)).toEqual(sorted);
  });
});
```

Once you save, you will see Jest complaining in the terminal window. 

You can also get rid of the sanity check block.

We are red! Time to go green!

------------------

## Implementing bubble sort

First we are going to use the bubble sort approach to sort arrays. This algorithm is the easiest to implement. Bubble sort is kind of ham fisted but has a O(n^2). If we are dealing with a large data set, this might be a bad idea, but let's give it a go anyway.

With bubble sort, you basically go through each item in the array and see if it is larger or smaller than its neighbor to the right, if it is larger, and so on through the array. It's pretty crude but it works.

Go ahead and take a stab on your own!

----------------

Solution:

```javascript
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < (arr.length - i - 1); j++) {
      if (arr[j] > arr[j + 1]) {
        //switch spaces if the earlier one is bigger than the later one
        console.log(`switching ${arr[j]} for ${arr[j + 1]}`)
        const smaller = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = smaller;
      }
    }
  }
```

As it comes together, you should see your test pass to green.

### Refactoring what we got

Let's continue test driving and make things more interesting.

Say we want to use the bubble sort algorithm to conditionally return the array in ascending or descending order.

Test first! Take a moment to to write another it block to try it yourself.

```javascript
it('sorts an array in descending order', () => {
  let descending = sorted.reverse();
  expect(sorter(unsorted, 'DESC')).toEqual(descending);
});
```

 Aaaand we are red. Get it green (no using `Array.prototype.reverse()`)!

My solution:

```javascript
const sorter = ((arr, direction = 'ASC') => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < (arr.length - i - 1); j++) {
      if (arr[j] > arr[j + 1]) {
        //switch spaces if the earlier one is bigger than the later one
        const lesser = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = lesser;
      }
    }
  }
  if (direction === 'DESC') {
    let reversed = [];
    for (let k = arr.length; k > 0; k--) {
      var end = arr.pop();
      reversed.push(end);
    }
    arr = reversed;
  }
  return arr;
});
```



# "Super" basic API integration tests

Let's move on to testing an actual interface for a back end web server. We will use the sorter function, which is already tested in isolation with a unit test. We will complete an Express API with at least one POST endpoint which accepts some numbers in an array and responds with the sorted array. 

Before we do that actual feature, let's do a smoke test by setting up a basic express server and a test.

Note that we installed `supertest` earlier which provides a succinct interface for testing HTTP. We will be using some of the SuperTest `request` DSL in conjunction with the Jest test runner. 

First add the blank files:

```shell
% touch server.js app.js app.test.js
```

 Remember we are practicing TDD today, so let's write our tests first and let them fail:

app.test.js

```javascript
const app = require('./app');

describe('Test the root path', () => {
  it('should respond to the GET method at root with important array', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.todos).toEqual(['shower', 'feed cat']);
      done();
    });
  });
});
```

Two things to call out here. An API request in real life takes non zero time, thus we need to test the API methods asynchronously. Jest provides a `done` function to [help out with this](https://facebook.github.io/jest/docs/en/asynchronous.html). Jest will wait for the done function to run before finishing the test. If the test fails, done will never be called. Makes sense. 

Your test should be red. Let's get it green!

app.js

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send({ todos: ["shower", "feed kitten"] });
});
```

There! We are red again because I intentionally added a boo boo. Fix it and get us green for real.

## Sorting as a service

Looks like we are doing great, we have a web server and it is tested, now it is just a matter of extending this to use our bubble sort util to do its magic on some JSON in a request body. (We have already installed the `body-parser` middleware which makes this possible.)

Let's start with our test since we are in TDD land today.

```javascript
const request = require('supertest');

....

describe('Test the sort path', () => {
  it('should response the post method', (done) => {
    request(app).post('/sort')
      .send({ "numbers": [2, 3, 1] })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.sorted).toEqual([1, 2, 3]);
        done();
      });
  });
});
```

This should fail big time. Let's build out the actual method now to get it green.

Here is my finished product:

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sorter } = require('./sorter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.status(200).send({ todos: ["shower", "feed cat"] });
});

app.post('/sort', (req, res) => {
  const unsorted = req.body['numbers'];
  const responseJSON = {
    unsorted,
    sorted: sorter(unsorted)
  };
  res.status(201).send(responseJSON);
});

module.exports = app;
```

At this point, we have passing tests, we are confident that it works, and yet we _never once started the node server_. Manual tests are for chumps. True, we spent way more time writing tests than actual server code but it saved us a lot of trouble!

## Organizing your app slightly better 

This is a mess. 

```shell
% mkdir utils test
```

Move the test files into `test` and the sorter module into `utils`.

Muuuch better.

My finished version of the app is [here](https://github.com/trivett/tdd_sorting_lesson).
