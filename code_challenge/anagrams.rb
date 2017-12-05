require 'pry'
require 'rspec'
=begin

This one is in Ruby since I felt like only writing tests for one language.

Let's make a class that can be configured with a list of words, and then will return every
anagram for that word. An anagram is when the letters of one word can be rearranged to create a
different word.

So for example:

anagram_machine = AnagramMachine.new(%w(apple ate eat lemon lettuce melon menu salt tea))
anagram_machine.match(apple)
# => []
anagram_machine.match(ate)
# => [eat, tea]
anagram_machine.match(lemon)
# => [melon]
anagram_machine.match(last)
# => [salt]


Try your code out with pry. When you think you have it, run tests by running:

$ rspec anagrams.rb

Red, green, refactor. 

BONUS round: Initialize your class with the words in /usr/share/dict/words and make sure it still
             works & doesn't have major performance issues.

=end



# code here


RSpec.describe AnagramMachine do
  let(:anagram_machine) { AnagramMachine.new(["apple", "ate", "eat", "lemon", "lettuce", "menu", "salt", "TEA"]) }
  # let(:english) {AnagramMachine.new(LANGUAGE)}
  describe "#match" do
    context "it fails" do
      subject { anagram_machine.match('blah') }

      it { is_expected.to eq [] }
    end
  end

  describe "#match" do
    context "it works with an anagram" do
      subject { anagram_machine.match('melon') }

      it { is_expected.to eq ["lemon"] }
    end
  end
  describe "#match" do
    context "it returns empty if the only anagram is the word itself" do
      subject { anagram_machine.match('apple') }

      it { is_expected.to eq [] }
    end
  end
  describe "#match" do
    context "it includes anagrams that are of different case in the list" do
      subject { anagram_machine.match('eat') }

      it { is_expected.to include "TEA" }
    end
  end
  describe "#match" do
    context "it includes anagrams that are of different case in the word" do
      subject { anagram_machine.match('EAT') }

      it { is_expected.to include "TEA" }
      it { is_expected.to include "ate" }
    end
  end
end
