# == Schema Information
#
# Table name: user_match_responses
#
#  id               :integer          not null, primary key
#  user_response_id :integer          not null
#  answer_id        :integer          not null
#

class UserMatchResponse < ActiveRecord::Base

  validates :user_response_id, :answer_id, presence: true

  belongs_to :user_response
  belongs_to :answer

end
