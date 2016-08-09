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

  belongs_to :user
  belongs_to :answer
  has_many :user_match_responses

  has_one(
    :question,
    through: :answer,
    source: :question
  )


end
