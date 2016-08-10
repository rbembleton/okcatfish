# == Schema Information
#
# Table name: user_responses
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  answer_id   :integer          not null
#  weight      :float            default(0.5), not null
#  explanation :text
#  created_at  :datetime
#  updated_at  :datetime
#

class UserResponse < ActiveRecord::Base

  validates :user_id, :answer_id, :weight, presence: true
  validates :weight, inclusion: (0.0..1.0)

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
  
  belongs_to :answer
  has_many :user_match_responses

  has_one(
    :question,
    through: :answer,
    source: :question
  )

  def add_match_responses(array_of_ids)

    if array_of_ids && array_of_ids.length != 0
      array_of_ids.each do |answer_id|
        UserMatchResponse.create!(answer_id: answer_id, user_response_id: self.id)
      end
    else
      #this is a default behavior
      UserMatchResponse.create!(answer_id: self.answer_id, user_response_id: self.id)
    end

  end

end
