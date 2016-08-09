# == Schema Information
#
# Table name: answers
#
#  id                :integer          not null, primary key
#  question_id       :integer          not null
#  order             :integer          not null
#  body              :text
#  personality_trait :string
#

class Answer < ActiveRecord::Base

  validates :question_id, :order, presence: true

  belongs_to :question
  has_many :user_responses
  has_many :user_match_responses

end
