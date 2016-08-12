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
      Question.where('id NOT IN (?)',
        (User.find(user_id)
          .questions_answered
          .select(:id)))
          .order(order: :asc)
          .limit(20)
    else
      Question.order(order: :asc).limit(20)
    end
  end




end
