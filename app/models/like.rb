# == Schema Information
#
# Table name: likes
#
#  id           :integer          not null, primary key
#  user_from_id :integer          not null
#  user_to_id   :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Like < ActiveRecord::Base

  validates :user_from_id, :user_to_id, presence: true
  validates :user_from_id, uniqueness: { scope: :user_to_id }

  belongs_to(
    :liker,
    class_name: "User",
    foreign_key: :user_from_id,
    primary_key: :id
  )

  belongs_to(
    :likee,
    class_name: "User",
    foreign_key: :user_to_id,
    primary_key: :id
  )


  def self.from_to_ids_new(from_id, to_id)
    Like.new(user_from_id: from_id, user_to_id: to_id)
  end

  def self.from_to_ids_create!(from_id, to_id)
    Like.create!(user_from_id: from_id, user_to_id: to_id)
  end



end
