# Testing

## Theory

### Tests are small programs that exercise a piece of your application.

```javascript
describe('feature A', () => {

  it('should behave like XYZ', () => {
    // use feature A and assert that XYZ occurs
  });

  it('should also behave like 123', () => {
    // use feature A again, maybe differently, and assert that 123 occurs
  });

});
```

### Tests may be written at different levels of scale.

- [unit, functional, acceptance, integration?](http://stackoverflow.com/questions/4904096/whats-the-difference-between-unit-functional-acceptance-and-integration-test/4904533#4904533)
- [small, medium, large?](https://testing.googleblog.com/2010/12/test-sizes.html)

Definitions are chose per organization or project, and generally follow how many componenets must communicate, how much state must be coordinated, or how long tests take to run.

### Tests may exercise different interfaces.

- `js`
- `http`
- `stdin/stdout`
- combinations thereof for higher level tests

### Tests may run in different environments.

- web applications have a server and a browser client
- mobile apps may have a server and a mobile app
- ...

## Practice

```shell
mkdir your-own
mkdir your-own/test
```

We'll use [`mocha`](http://mochajs.org/) and [`chai`](http://chaijs.com/) for describing tests, running tests, and writing assertions.

```shell
npm init
npm install --save-dev mocha chai
```

Add a `test` script to your `package.json` file. Continuous testing!

```json
{
  "scripts": {
    "test": "./node_modules/.bin/mocha --reporter min --watch test"
  }
}
```

Take a look at the `code/` directory.

Grab a couple of files.

```shell
cp code/fizzBuzzSum.js your-own/
cp code/test/fizzBuzzSum.js your-own/test/
```

Let's see how the tests are written and make them pass!

## Questions...

So?