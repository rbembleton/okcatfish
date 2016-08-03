# == Schema Information
#
# Table name: profile_texts
#
#  id        :integer          not null, primary key
#  user_id   :integer          not null
#  about     :text
#  doing     :text
#  faves     :text
#  things    :text
#  think     :text
#  sat_night :text
#  msg_me_if :text
#

class ProfileText < ActiveRecord::Base

  validates :user_id, presence: true, uniqueness: true

  belongs_to(:user)

end
