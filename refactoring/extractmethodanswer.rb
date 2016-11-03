require 'rspec'
require 'pry'

class Person
  attr_accessor :first_name, :middle_name, :last_name, :city

  def initialize(first,middle,last,city)
    @first_name = first
    @middle_name = middle
    @last_name = last
    @city = city
  end

  def introduction
    "Greetings, I am #{full_name}, I come in peace."
  end

  def address
    "#{full_name} \n#{city}"
  end

  private

  def full_name
    "#{first_name} #{middle_name} #{last_name} of #{city}"
  end
end


RSpec.describe Person do
  me = Person.new("Vincent", "Paul", "Trivett", "Brooklyn")

  describe "introduction" do
    it "delivers the right formal intro" do
      expect(me.introduction).to eq("Greetings, I am Vincent Paul Trivett of Brooklyn, I come in peace.")
    end
  end

  describe "address" do
    it "delivers the right formal intro" do
      expect(me.address).to eq("Vincent Paul Trivett \nBrooklyn")
    end
  end
end
