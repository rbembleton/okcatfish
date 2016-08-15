# == Schema Information
#
# Table name: message_threads
#
#  id         :integer          not null, primary key
#  created_at :datetime
#  updated_at :datetime
#

class MessageThread < ActiveRecord::Base

  has_many(
    :thread_user_links,
    class_name: "ThreadUserLink",
    primary_key: :id,
    foreign_key: :thread_id
  )

  has_many(
    :users,
    through: :thread_user_links,
    source: :user
  )

  has_many(
    :messages,
    -> { order(created_at: :asc) },
    class_name: "Message",
    primary_key: :id,
    foreign_key: :thread_id
  )

  has_many(
    :message_notifications,
    class_name: "MessageNotification",
    primary_key: :id,
    foreign_key: :thread_id
  )

  def self.new_from_user_ids(user1_id, user2_id)
    mt = MessageThread.create!()
    ThreadUserLink.create!(user_id: user1_id, thread_id: mt.id)
    ThreadUserLink.create!(user_id: user2_id, thread_id: mt.id)
    mt
  end

  def self.find_by_user_id(user_id)
    MessageThread.joins(:thread_user_links).
      where("thread_user_links.user_id = ?", user_id)
  end

  def self.find_by_two_user_ids(user1_id, user2_id)
    MessageThread.joins("JOIN thread_user_links AS links1 ON message_threads.id = links1.thread_id").
      joins("JOIN thread_user_links AS links2 ON links2.thread_id = links1.thread_id").
      find_by("(links1.user_id = ? AND links2.user_id = ?)",
        user1_id, user2_id)
  end

  def self.send_message(options) # :author_id, :recipient_id, :body
    mt = MessageThread.find_by_two_user_ids(
      options[:author_id],
      options[:recipient_id]
    )

    unless mt
      mt = MessageThread.new_from_user_ids(
        options[:author_id],
        options[:recipient_id]
      )
    end

    mt.new_message(options)
  end


  def most_recent_message
    messages.order(created_at: :desc).first
  end


  def new_message(options)
    self.updated_at = Time.now
    self.save!

    Message.create!({
      body: options[:body],
      author_id: options[:author_id],
      thread_id: self.id,
      notification: options[:notification] || false
    })
  end

  def unread_messages
    unreads = {}
    user1, user2 = self.users.to_a

    switch_hash = {
      user1.id => user2.id,
      user2.id => user1.id
    }

    unreads[user1.id] = 0
    unreads[user2.id] = 0

    messages.each do |message|
      if message.is_read == false
        unreads[switch_hash[message.author_id]] += 1
      end
    end

    unreads
  end



end
