require 'rspec'

class Student
  attr_accessor :first_term_assiduity, :first_term_test, :first_term_behavior
  attr_accessor :second_term_assiduity, :second_term_test, :second_term_behavior
  attr_accessor :third_term_assiduity, :third_term_test, :third_term_behavior

  def set_all_grades_to grade
    %w(first second third).each do |which_term|
      %w(assiduity test behavior).each do |criteria|
        send "#{which_term}_term_#{criteria}=".to_sym, grade
      end
    end
  end

  def first_term_grade
    (first_term_assiduity + first_term_test + first_term_behavior) / 3
  end

  def second_term_grade
    (second_term_assiduity + second_term_test + second_term_behavior) / 3
  end

  def third_term_grade
    (third_term_assiduity + third_term_test + third_term_behavior) / 3
  end
end



RSpec.describe Student do

  describe "term grades" do
    student = Student.new
    student.set_all_grades_to 10
    it "has a grade for all three terms" do

      expect(student.first_term_grade).to eq(10)
      expect(student.second_term_grade).to eq(10)
      expect(student.third_term_grade).to eq(10)
    end
  end
end
