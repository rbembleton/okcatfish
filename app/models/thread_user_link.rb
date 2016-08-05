# == Schema Information
#
# Table name: thread_user_links
#
#  id        :integer          not null, primary key
#  user_id   :integer          not null
#  thread_id :integer          not null
#

class ThreadUserLink < ActiveRecord::Base

  validates :user_id, :thread_id, presence: true

  belongs_to :user
  belongs_to(
    :thread,
    class_name: "MessageThread",
    foreign_key: :thread_id,
    primary_key: :id
  )

end
