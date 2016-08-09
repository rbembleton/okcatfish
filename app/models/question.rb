# == Schema Information
#
# Table name: questions
#
#  id       :integer          not null, primary key
#  body     :text
#  category :string
#  order    :integer
#

class Question < ActiveRecord::Base


  has_many :answers

  has_many(
    :user_responses,
    through: :answers,
    source: :user_responses
  )




end
