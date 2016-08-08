# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  thread_id    :integer          not null
#  author_id    :integer          not null
#  body         :text             default(""), not null
#  created_at   :datetime
#  updated_at   :datetime
#  is_read      :boolean          default(FALSE), not null
#  notification :boolean          default(FALSE)
#

class Message < ActiveRecord::Base

  validates :thread_id, :author_id, :body, presence: true
  validates :is_read, inclusion: { in: [false, true] }
  validates :notification, inclusion: { in: [false, true] }

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to(
    :thread,
    class_name: "MessageThread",
    foreign_key: :thread_id,
    primary_key: :id
  )

end
