# Testing APIs: Rails edition.

In the last few classes, we explored testing Node/Express APIs with Jest, the favored framework for unit and end to end testing from that company that makes React.

Just a show of hands, how many of you have the words "ruby" or "rails" on your resumes? And how many of you are comfortable working with a Rails stack? I bring this up not to shame you into taking stuff off your list of skills (though you should be prepared to talk in a non-BS way about _anything_ that you claim on your CV - I've done this to interviewees and it's surprising how often people just try to wing it) but because it is important to have _diverse_ skills as a developer to broaden the range of jobs you are eligible for and simply make yourself a better programmer. 

Today we are going to work on creating an API with multiple endpoints and test the whole way through. Phillip and I can tell you, a developer's life is like 60% testing. It behoves you to get used to that.

## What we will use

### Rails API

Ruby on rails is the 'omakase' platter of web frameworks. It used to be more opinionated, driving Rails developers towards the 'Rails way' but it is more flexible now. For instance, you can pass a single argument and come out with a no-nonsense API application with no HTML or JavaScript files generated. This is an example of rails getting more modern in its approach, but still maintains the ease of use that makes rails such a popular stack, especially for startups in New York.

Since we have all worked extensively with Node, we know that testing and managing environments between dev, testing, and production can be a pain. Rails  does this so seamlessly you almost forget that it's happening.

### Rspec

According to a [recent survey](https://www.jetbrains.com/research/devecosystem-2017/ruby/) a whopping 3/4 of Rails developers use Rspec as their test framework. It is undeniably the community favorite and the most likely to find on the job, but for some reason not the default for Rails, so we will have to fix that. 

### Factory Bot

Formerly Factory Girl, this lets us test with reliable and simple mock data.

### Jbuilder

This is the inspiration for this particular lesson. In our Slack, we had a little exchange regarding which RDBMS would be best for GeoJSON. This should not be a concern. The way your underlying data is structured should not dictate the delivery of that data. JBuilder is not the fastest but definitely the easiest way to manage a JSON view layer in Ruby.

## Setup

Just make sure that you have PostgreSQL, Rails 5, and Ruby 2.3+ installed on your machine.

```shell
$ which ruby
/Users/vincent/.rbenv/shims/ruby
$ ruby -v
ruby 2.4.1p111 (2017-03-22 revision 58053) [x86_64-darwin16]
$ rails -v
Rails 5.2.0
$ which psql
/usr/local/bin/psql
```



Let's get started!

In whatever directory you like, run the following command:

```shell
rails new msg --api --database=postgresql --skip-test
```

`rails` is a command line program that generates code for you. It creates a directory called `msg` with lots of goodness inside. The `—api` flag instructs Rails to make a sort of bare bones app for more modern development rather than the usual soup to nuts approach. We prefer postgres in dev rather than the default of SQLite. Since we want to use Rspec, we have to skip the Rails default test framework, we tell it to not bother making tests for us out of the box. As opinionated as Rails is, it can be flexible as you can see. 

This is also a good time for a commit.

```shell
git commit -m 'initial commit'
```



Now we will set up our postgres database by running `rails db:create`

You should see that a development and test database was created for your postgresql installation. Rails has three environments: dev, test, and production. Each has it's own siloed database. You certainly don't want to cross pollinate here.

#### Installing Rspec

Before we even create a message model, we should install the gems for our testing suite. Open `Gemfile` and update the test/dev block:

```ruby
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails'
  gem 'factory_bot_rails'
end
```

 This is a little bit like your package.json block for —dev dependencies. We don't need this in the production bundle. While we are here, uncomment the `jbuilder` gem in the main block (should be about line 13 or so).

Now run `bundle` from the command line to install, then `rails generate rspec:install` to let rspec create it's test directory.

As always, let's make a sanity check (this is from the Rspec rails documentation)

```shell
rails generate scaffold Person name:string
rake db:migrate && rake db:test:prepare
rspec spec --format documentation
```

This just generated well… a lot of code. It's pretty crazy and of **course** you would not use generated scaffolding in production. This is just for demonstration. The Rails scaffold generator creates a model, a database table, a controller with the 7 most common actions on it, all seven restful routes to match. It also creates `jbuilder` templates for JSON views. 

The scaffold provides us with a nice file structure out of the gates, as well as something to crib from for examples of well-written tests. When we do this for real, we can add just one at a time of course. Before we look at the tests, let's review the MVC application architecture through the generated code.

## Models

These are the 'nouns' in your application. These correspond to rows in database tables. In our application we will make User and Message models. In the generator above we passed `name: string`. In Rails, database columns correspond to methods on the model. For any Person object, you can call it's name. Additional behavior can be added as columns on the DB or as methods on the model class.

## Routes

Routes are the HTTP endpoints that your application will respond to. Each route corresponds to controller action. If you look at `config/routes.rb` you will see a single line `resources: widgets`. This generates the seven main routes most applications use. You can see which endpoints and which controller actions that they call by running `rails routes`. This differs a bit from Express where the functions that declare routes have their actions connected directly to them.

## Controllers 

These are the actions in your application. When an HTTP endpoint is hit, the controller code that corresponds to it is run. Generally you want the controllers to have the bare minimum of code and functionality and put more of that on the model level. 

## Views

Normally, in a 'regular' Rails application, you would have a bunch of html templates here, one for each controller action. There will be `index.html.erb`, `show.html.erb` etc. These would be the HTML files and partials that are generated on the fly and sent to the client. But we are making an API that we can use to serve data to a React, Angular, or Vue application. 

Instead of HTML, we will use [Jbuilder](https://github.com/rails/jbuilder), which let's us create templates that turn Ruby code into JSON. It is best practice to not let your underlying data, your database, dictate how you serialize data that you send to the client or to separate services. Jbuilder helps a lot with this. It has a nice and intuitive DSL (domain specific language) for structuring your JSON that is easy to get the hang of. The docs on their Github page is the best place to learn more or look stuff up.

# Tests

Since we have installed `rspec` and `factory_bot` it also generated test files to test the generated code.  

## Factories

A factory is a sort of a mock fixture that can easily serve as the stand in for a real instance of the model class (a person, a message, a widget, whatever). The factory syntax is easy to get a hang of on [thoughtbot's documentation on GitHub](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md). Let's make our example Person have the name `jessica jones`. 

```ruby
#spec/factories/people.rb
FactoryBot.define do
  factory :person do
    name "jessica jones"
  end
end

```

## Models

The factory objects are used in the model tests to provide an easy abstraction of that class. The scaffolding command doesn't generate any model tests for us so let's go through one.

Say we want the API to return a Person with their name formatted properly. Here is what our test would look like:

```ruby
# /spec/models/person_spec.rb

require 'rails_helper'

RSpec.describe Person, type: :model do
  describe "Display of proper name" do
    it 'returns its name in title case' do
      person = create(:person)
      expect(person.capitalized_name).to eq('Jessica Jones')
    end
  end
end

```



Here we see the value of factory_bot. Here, `create(:person)` just churns a Person out of the factory according to the structure that you determine in the factory file. This keeps the mock setup separate from the test. 

For those of you who were here for the node/express version of testing APIs class with me, this might look familiar.

A unit test is usually structured just like this whether you are using Jasmine, Mocha, or Jest in JavaScript, Pytest or UnitTest in Python, or Rspec or Minitest in Ruby. You have some language-specific setup, then a describe block to logically group functionality, an it block which tests a specific atom of functionality, and an expectation that given a certain input, you will get a certain output. 

In Rspecs' case, [the syntax for this is fairly complex](https://relishapp.com/rspec/rspec-rails/v/3-7/docs), so we will only touch on the most go-to expectations. Since we just wrote our first test today (on our own that is) we can run the thing and watch it fail! Whoo!

```shell
rspec spec --format documentation
```

FYI `rspec` invokes the rspec binary. You _might_ have to run it as `bundle exec rspec spec` if you don't have the same setup as me. spec is the directory in which you recursively run the tests. If you are working in a narrow part of the app like just in models, you can run `rspec spec/models` to make things run more quickly. Adding `—format documentation` makes your tests verbose and all which I like. Feel free to omit if you prefer succinct output.

Now your test should be failing, so we need to write the code to make it actually work.

```ruby
# app/models/person.rb
class Person < ApplicationRecord
  
  def capitalized_name
    self.name.titleize
  end

end
```

Just in case you are wondering, Ruby supports an implicit return, meaning that the last thing to evaluate in a method gets returned from a method. 

Now if we run our tests, the model test that we added should work. 

## Controller tests

Controller tests were generated by the scaffolding command, but they aren't super useful since well, they are scaffolding tests created for demonstration purposes. Let's knock them out so we can use factory_bot and something that resembles a proper test. 

Make your `people_controller_test.rb` look like so:

```ruby
require 'rails_helper'

RSpec.describe PeopleController, type: :controller do
  render_views
end
```

Let's write some detailed tests for the index and create endpoints at least. 



End result: 



```ruby
require 'rails_helper'

RSpec.describe PeopleController, type: :controller do
  render_views
  
  describe "GET #index" do
    
    it "returns a success response" do
      create(:person, name: 'daredevil')
      create_list(:person, 3)

      get :index, format: :json

      res = JSON.parse(response.body)      

      expect(response).to be_success
      expect(res[0]['name']).to eq('daredevil')
      expect(res.length).to eq(4)
    end
  end


  describe "POST #create" do
    it "creates a new Person" do
      expect {
        post :create, params: {person: {name: 'luke cage'}}, format: :json
      }.to change(Person, :count).by(1)
    end

    it "renders a JSON response with the new person" do
      post :create, params: {person: {name: 'iron fist'}}, format: :json
      res = JSON.parse(response.body)      
      
      expect(response).to have_http_status(:created)
      expect(response.content_type).to eq('application/json')
      expect(res['name']).to eq('iron fist')
    end
  end
end
```



## Views

Our View layer is just JSON since this is a nice simple API. We are also _implicitly_ testing the view layer since the controllers are wired to return templates with the jbuilder-created JSON. In a normal Rails application, this would require end-to-end tests with Capybara or some other similar acceptance test framework. We will make updates to the jbuilder views and test it in the controller tests.

Let's first create a Person in dev and see what it looks like in Postman.

At the View layer, we can customize the JSON response. View files that start with an underscore are **partials** which can be reused in various templates. Let's open `app/views/people/_person.json.jbuilder`, which is reused in the show and index views. 

Here, we can use the Person model method that we created. We can alter the partial as such.

```ruby
json.name person.capitalized_name
json.birthday person.created_at.strftime('%B %d')
json.url person_url(person, format: :json)
```

Now we have a friendlier looking name and created_at rather than just spitting back exactly what is in the database. We can see this change in Postman.

But our tests! I trust you can fix them.

# Solo work

Generate a new model the proper way:

```shell
rails generate model Message text:string
rails db:migrate
```



Make a message index json response only show the first 200 characters. Write a test to make sure that this will work. Make the show view show the full text of the message. 

Don't use the scaffold generator! After the generator above you can create the controller and such on your own from scratch. Challenge yourself to figure out how to test all seven RESTful routes. ÷

# Takeaways

**Environments**

Rails enforces separation of the dev, test, and production environments out of the box. This is best practice, and Rails just makes it easier. You can implement the same in any language. 

**Data doesn't need to be the same as your view**

Jbuilder is just one solution for serializing data from the database for consumption by the view or frontend application. The application layer of the stack should take care of disconnects between the database and the view.

**Testing** 

I cannot harp on this enough. As a developer you will spend more than half of your time testing. An applicant that has no experience testing is an easy no thank you. Once you get the hang of your testing framework, it's not too hard. For future projects to showcase to employers, you should start testing from the beginning. Nothing says 'job ready' than someone who has considerable coverage even for her personal projects. 



