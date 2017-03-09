require 'pry' #this is a gem that lets you drop in a repl, like debugger

require_relative 'lib/cat'
require_relative 'lib/dog'
require_relative 'lib/dog'
require_relative 'lib/dog'


c = Cat.new

d = Dog.new

binding.pry

