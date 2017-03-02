# closures

Let's start with some code:

```js
var greeter = function (name) {
  return function () {
    return 'Hello ' + name;
  };
};

var daveGreeter = greeter('Dave');

daveGreeter();
// => 'Hello Dave'
```

In the words of Dave Thomas:

> This works because functions in ~~Elixir~~ Javascript automatically carry
> with them the bindings of variables in the scope in which they are defined.
> In our example, the variable `name` is bound in the scope of the outer
> function. When the inner function is defined, it inherits this scope and
> carries the binding of `name` around with it. This is a *closure*-the scope
> encloses the bindings of its variables, packaging them into something that can
> be saved and used later.

---

## closures in action

Encapsulation is an important tool in OOP because it allows us to explicitly
separate the implementation from the interface.

OOP is about objects, right?

But importantly, it's about passing messages (method calls) to those objects and
letting them determine how to correctly implement the requested behavior.

More code:

```js
var dave = {
  name: 'Dave',
  greet: function () {
    return 'Hello ' + this.name;
  }
};
dave.greet();
// => 'Hello Dave'
```

But what happens when client code starts meddling with the implementation?

```js
dave.name = 'Poopyhead Dave';
dave.greet();
// => 'Hello Poopyhead Dave'
```

Everything goes south.

---

Now this last example is contrived, and Dave's name change is probably Okay.
But in real-world code there may be intricate requirements about how internal
code can be executed, perhaps in specific order, or with arguments that fall in
an expected range.

With complicated assumptions clients risk misusing the implementation.

More code:

```js
function counter(from, to) {

  var count;

  if (from > to) {
    throw new Error('from may not be greater than to');
  }

  function reset() {
    count = from;
  }

  function next() {
    if (count > to) return null;
    return count++;
  }

  reset();

  return {
    reset: reset,
    next: next
  };

}
var ones = counter(1, 3);

ones.next();
// => 1
ones.next();
// => 2

ones.reset();

ones.next();
// => 1
ones.next();
// => 2
ones.next();
// => 3
ones.next();
// => null
```

In the case of `counter` there is an explicit public interface (`next`, `reset`)
to interact with the internal state of the object. You can be confident that
your `counter` will always be used properly, in the ways sanctioned by its
public interface.

To be clear:

- `reset` is an example of a closure because it encloses over the binding of
  `count` and `from`
- `next` is a closure over the bindings of `count` and `to`

Encapsulation is a more abstract concept which can be realized in javascript
using closures.

