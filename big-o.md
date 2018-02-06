# Big O notation and algorithm efficiency

Not all algorithms (read: blocks of code that solve a problem) are created equally.

It's one thing to get the right output. Depending on how you are getting your result, you might be setting yourself up for some really inefficient use of computing resources. 

Normally, it is _obvious_ that your code is inefficient if you notice your CPU cooling fan going berserk and your code taking forever to run. This is ultimately why programmer have to care about efficiency. If your sloppy code is making too many assignments, bloating memory unnecessarily, and using too many CPU cycles, you will find yourself paying more for your severs and/or users will have to wait longer to get a response.

Devops engineers be like:

![shitty code](https://cdn-images-1.medium.com/max/1600/0*uoMExsEFIS8HZyYU.gif)



If this is the case, it would be a good idea to triage your problem and use a service such as [Scout](https://scoutapp.com/) or [New Relic](https://newrelic.com/) to pinpoint the sluggish code.

## Hardware agnostic analysis

| Tired                                    | Wired                                    |
| ---------------------------------------- | ---------------------------------------- |
| Timing a function given different inputs to see which bloat up and run slowly | Using a hardware agnostic notation to describe the consequences of running the code on a bigger input |

Enter Big O notation. The letter O is used because the growth rate of a function is also referred to as **order of the function**. Order is another way of expressing the rate of growth of a function.

Big O is a formalized notation that classifies algorithms according to how much runtime or resource use grows as the input size grows. It means nothing if I run some code on a recent ish MacBookPro and someone else runs the same code on like a dogshit Kindle Fire. It has nothing to do with seconds or milliseconds or kilobytes or whatnot. It's purely mathematical and you can do it without a computer if you so wish.

These are the common Big O types:

| Big O type | Name        |
| ---------- | ----------- |
| O(1)       | Constant    |
| O(log (n)) | Logarithmic |
| n          | Linear      |
| O(nlog(n)) | Log Linear  |
| O(n^2)     | Quadratic   |
| O(n^3)     | Cubic       |
| O(2^n)     | Exponential |

Here is a graph visualizing what this actually means for runtime:



![bit o graph](https://interactivepython.org/runestone/static/pythonds/_images/newplot.png)

I think you can see which types of Big O types are desirable.



## Some examples of Big O in Python

### Constant

No matter what, a constant Big O has to do the same amount of work regardless of the input. One example that I found was a company in South Africa that was complaining about the internet speed so it demonstrated that a carrier pigeon can carry X gigabytes to the other office some ways away faster than their crappy internet connection. Everyone was like wtf! 

But think about it, a carrier pigeon can carry a micro SD card with 1kb as easily as it can carry 200 gb. Pigeon don't care. Pigeon has a Big O of 1. On the internet, more data === more time. After a certain threshold, the pigeon is faster. Here is an example in Python code:

```python
def constant_function(n):
    print n[0]
```

This function is constant. Whether the list `n` is 2 or a bajillion, it takes the same amount of time.

### Linear

Linear is like a book. The number of pages directly correlates to how long it takes (assuming similar font size, margins, and spacing, which is something that I know a lot about having dicked around until the night before shit is due in college).

Here is an example:

```python
def linear_function(n):
    for value in n:
        print value
```

The longer this is, the more operations the Python runtime has to do. 

### Quadratic

Quadratic functions do the square of the operations of the length of the input. A good example is a nested loop like so:

```python
def quadratic_function(n):
    for i in n:
        for j in n:
            print i, j
```

Assuming that there is a list of [1,2,3], the computer will have to do nine things, that's three squared. n times n.

In an interview setting, you might be asked to find the order for a particular algorithm, they might fit in one of these buckets, or it might be something random such as O(2n).



# Best case, worst case

We are much more interested in the worst case scenarios than the best case scenarios. In some cases, say a function that breaks at a random interval somewhere between 1 and n, the order is effectively n, since that is the worst case. O(2n) is effectively O(n).



## Quiz

What is the big O value for these simple functions? 

```python
def startup_idea(n):
   for x in range(n):
     for y in range(n):
        print 'yo!'
```

```python
def done_machine(n):
    for x in range(n):
         print 'it is done'
```

```python
def counter(n):
	w = 0
    for x in range(n):
       w = w + 1

    for y in range(n):
       w = w - 1
```

```python
def contains(n, i):
  '''Returns true if i is in the list n.'''
  for x in n:
    if x == i:
      return True
  return False
```



Some cool links for learning more:

http://bigocheatsheet.com/

https://stackoverflow.com/questions/487258/what-is-a-plain-english-explanation-of-big-o-notation/487278#487278

https://www.youtube.com/watch?v=MyeV2_tGqvw