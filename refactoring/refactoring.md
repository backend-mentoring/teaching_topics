#Refactoring

Refactoring is when you take existing code that gets the job done, and you improve the quality, readability, or idiomaticness of your code without any noticable improvement for the user. According to Martin Fowler, who more or less invented the term it means:


<blockquote>Refactoring (noun): A change made to the internal structure of software to make it easier to understand and cheaper to modify with-out changing its observable behavior.</blockquote>

It's a term that is commonly misused. I often hear other programmers say that they are going to refactor something to fix bugs or improve performance. This is not what we are talking about. 

Refactoring is a favor to your future self reading code from ages ago or a collaborator that you want to give the benefit of readable, modular, easily changed code. After you get used to doing it every now and again, you will become skilled at finding 'code smells' and you will know how to fix them. It's also a great way to get to know a codebase. If you go around and improve the code without breaking anything, you will come away knowing what its doing, and your collaborators will thank you (unless they are insecure dicks).

##Tests are a big deal here

The first thing that you need before you refactor code is a robust (or robust enough) test suite so you know that your fancy code improvement isn't the butterfly that flaps its wings in Mombasa and causes a hurricane in Florida. Without that, it's best to let sleeping dogs lie.

This is part of the reality of software development. People don't always follow best practices, including yours truly. There are such things as deadlines, and unfortunately, not everyone has the luxury of writing clean code. People cut corners to save time, and it ends up costing far more in the long run. 

##Refactoring kata #1: Extract Method

####The smell: Repeated code in multiple places within a class

####The solution: DRY it up!

Check out `extract_method.rb` for a simple example.


##Refactoring kata #2: Extract Class/module

One class should have one responsibility. Don't forget that in Rails, you can have model classes that aren't representative of Active Record tables. Having classes that each do one thing and know only what they need makes your program a lot easier to understand.

Keep in mind that cleaner code doesn't always mean *less* code. The Extract Class example shows this clearly. Think of the future though. The more concise version (the before) is harder to read and harder to expand on. 


##Help is out there

Though I personally prefer against them, IDEs such as Ruby Mine and PyCharm from JetBrains offer built in advice. Integrated development environments offer 

For ruby, there is a gem called [Rubocop](https://github.com/bbatsov/rubocop) which studies your code and points out uncleanliness. It's based on the widely followed [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide). Unlike Python, Ruby lacks a canonical set of rules regarding coding style, and some companies have their own style guides. It's a bit strict, but Rubocop provides food for thought when refactoring your code.