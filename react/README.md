# no magic

Typing helps wear out the magic. Learn this by doing it yourself.

We'll be interacting directly with `ReactDOM` and `React`, so don't hesitate to consult the [documentation](https://facebook.github.io/react/docs/react-api.html).

1. create a project directory

   ```sh
   cd wherever/you/like/to/code
   mkdir no-magic
   cd no-magic
   ```

2. grab `react.min.js` and `react-dom.min.js`

    ```sh
    curl https://unpkg.com/react@15/dist/react.min.js -Lo "react.min.js"
    curl https://unpkg.com/react-dom@15/dist/react-dom.min.js -Lo "react-dom.min.js"
    ```

3. create an unmagical `script.js`

    ```javascript
    ReactDOM.render(
      React.createElement('h1', null, 'Hello, World!'),
      document.getElementById('root'));
    ```

4. create an unmagical `index.html`

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>no magic react</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="/react.min.js"></script>
      <script src="/react-dom.min.js"></script>
      <script src="/script.js"></script>
    </body>
    ```

5. serve the static website you just made

    ```sh
    python -m SimpleHTTPServer
    ```

5. [profit](http://127.0.0.1:8000/)

## let's break that down

```javascript
ReactDOM.render(
  React.createElement('h1', null, 'Hello, World!'),
  document.getElementById('root'));
```

|   |   | description |
|---|---|---|
|[ReactDOM.render](https://facebook.github.io/react/docs/react-dom.html#render)||Render a React element into the DOM in the supplied container|
|[React.createElement](https://facebook.github.io/react/docs/react-api.html#createelement)|element|Create and return a new React element of the given type|
|[document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)|container|Returns a reference to the element by its ID|

```
React.createElement(
  type,
  [props],
  [...children]
)
```

## we can type less

```javascript
var c = React.createElement;
```

Using 2-space indentation and a single letter abbreviation makes nested elements indent properly - [source](https://github.com/ustun/react-without-jsx).

```javascript
c('div', null,
  c('h2', null, 'My Story'),
  c('p', null, 'Once upon a time, in a land far far away...'),
  c('div', null,
    c('h3', null, 'Subplot'),
    c('p', null, 'Lucy wanted a machine gun for her birthday, but mama would not have it.')),
  c('p', null, '...But back to the story!'))
```

## componenets and state

Let's add a `Counter` component to `script.js` using [React.createClass](https://facebook.github.io/react/docs/react-api.html#createclass):

```javascript
var c = React.createElement;

var Counter = React.createClass({

  displayName: 'Counter',

  getInitialState: function () {
    return { count: 0 };
  },

  countBy: function (delta) {
    this.setState(function (previousState) {
      return { count: previousState.count + delta };
    });
  },

  render: function() {
    return (
      c('div', null,
        c('button', { onClick: this.countBy.bind(this, 1) }, 'up'),
        c('div', null, this.state.count),
        c('button', { onClick: this.countBy.bind(this, -1) }, 'down'))
    );
  }

});

ReactDOM.render(
  c(Counter, null),
  document.getElementById('root'));

```

## interesting bits?

> With React.createClass(), you have to provide a separate getInitialState method that returns the initial state:

```javascript
getInitialState: function () {
  return { count: 0 };
}
```

> props...

```javascript
c('button', { onClick: this.countBy.bind(this, 1) }, 'up')
```

> The type argument can be either a tag name string (such as 'div' or 'span'), or a React component type (a class or a function).

```javascript
c(Counter, null)
```

## create-react-app: under the hood

```sh
# create and eject an app
create-react-app everything-is-on-fire
cd everything-is-on-fire
npm run eject

echo "a fresh create-react-app depends on $(ls node_modules | wc -l) modules"
echo "the ejected app has this file structure..."
tree -I node_modules

# do some exploring...

cd ..
rm -rf everything-is-on-fire
```
