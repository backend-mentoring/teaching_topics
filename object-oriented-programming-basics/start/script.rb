require 'pry' #this is a gem that lets you drop in a repl, like debugger

require_relative 'lib/cat'
require_relative 'lib/dog'
require_relative 'lib/plant'
require_relative 'lib/venus_fly_trap'
require_relative 'lib/person'


c = Cat.new

d = Dog.new

binding.pry

