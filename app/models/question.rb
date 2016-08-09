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


  has_many :answers, -> { order order: :asc }

  has_many(
    :user_responses,
    through: :answers,
    source: :user_responses
  )

  def self.next_twenty(user_id)
    if UserResponse.exists?(user_id: user_id)
      Question
        .joins('JOIN answers ON answers.question_id = questions.id LEFT OUTER JOIN user_responses ON user_responses.answer_id = answers.id')
        .where('user_responses.user_id = ? OR user_responses.user_id IS NULL', user_id)
        .group(:id)
        .having('COUNT(user_responses.user_id) = 0')
        .order(order: :asc)
        .limit(20)
    else
      Question.order(order: :asc).limit(20)
    end
  end




end
