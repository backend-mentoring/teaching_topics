# Design Patterns

What do we want to accomplish with design patterns?

1. **Simplification**

2. **Decoupling**
3. **Single Responsibility Principle**



## Creational Patterns

These patterns focus on the automatic creation of objects without having to instantiate them directly. This simplifies our interface and allows for the creation of objects through a single interface. The responsibility of object creation will fall on this interface alone, so when we change something in the other objects, we only need to update the factory to pass tests.

### Factory

This pattern uses polymorphism to create a common interface to create different types of objects. This may arise when we see the responsibility of creating multiple objects spread across many other classes/objects.

```python
class Circle(object):
  	def draw(self):
      	print('im a circle')

class Square(object):
  	def draw(self):
      	print('im a square')

# single function to create ALL types of shapes
def shape_factory(type):
  	if type == 'circle': return Circle()
    if type == 'square': return Square()
```



**Excercise:**

```python
class ChessBoard(object):
  	def __init__(self, rows, columns):
      	self.board = [[None for _ in range(rows)] for _ in range(columns)]
        self.populate_board()
        
    def populate_board():
      	# populate the board with pieces represented by json strings
```



## Structural Patterns

Structural patterns are focused on the composition of classes and objects. We create different interfaces that define methods to be used by another subsystem. Sometimes these classes will be abstract only.

###Facade

As our code becomes more complex, the number of objects grows. To simplify our high level API we create an interface object to expose methods that handle all of the objects in our system. 

In this example we have a car which is made up of many smaller parts. In this implementation, the user will have to interact with the smaller parts in order to create the whole car.

```python
class Car(object):
  	def __init__(self, tires, fuel_tank):
    	self.tires = tires
        self.fuel_tank = fuel_tank
    
class Tire(object):
  	def __init__(self, orientation, pressure):
    	self.orientation = orientation
    	self.pressure = pressure
    
  	def fill(self, amount):
    	self.pressure = self.pressure + amount
    
class FuelTank(object):
  	def __init__(self, level):
      	self.level = level
        
    def fill(self, amount):
      	self.level = self.level + amount
        
# how the user interacts with our system
tire1 = Tire('front-left', 100)
tire2 = Tire('front-right', 100)
tire3 = Tire('back-left', 100)
tire4 = Tire('back-right', 100)

fuel_tank = FuelTank(100)

my_car = Car([tire1, tire2, tire3, tire4], fuel_tank)
my_car.fuel_tank.fill(10)
```



**Excercise**:

How can we make this better?

Which class can act as our facade?



### Adapter

This pattern allows us to create an adapter class for an object that is not compatible with an interface. Let's say we are making a game where, whenever someone clicks an object, it makes a sound. The problem is we have so many objects, but we want a simple and clean implementation of a **click_object** function.

```python
class Bush(object):
  	def __init__(self, color):
      	self.color = color
    
    def rustle(self):
      	return 'rustling sound'
        
class Animal(object):
  	def __init__(self, species, sound):
      	self.species = species
        self.sound = sound
        
    def make_sound(self):
      	return self.sound
        
def click_object(thing):
  	print(thing.make_sound())
    
# adapter class for our incompatible Bush
class BushAdapter(object):
  	def __init__(self, bush):
      	self.bush = bush
    
    def make_sound(self):
      	return self.bush.rustle()
      
# now we click a bush using the same function
bush = BushAdapter(Bush('red'))
tiger = Animal('tiger', 'tiger purr')

click_object(bush)
click_object(tiger)
```



## Behavioral Patterns

### Chain of Responsibility

```python
class LogHandler(object):
  	
class DatabaseHandler(object):
  	def execute(self):
```

