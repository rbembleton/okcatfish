json.array!(@threads) do |message_thread|
  other_user = message_thread.users.first.id == current_user.id ? message_thread.users.second : message_thread.users.first
  json.(message_thread, :id, :created_at, :updated_at)

  json.unread_messages message_thread.unread_messages

  json.most_recent_message do
    most_recent_message = message_thread.messages[-1]
    json.(most_recent_message, :id, :body, :is_read, :notification)
    json.time_ago time_ago_in_words(most_recent_message.created_at)
    json.author most_recent_message.author.username
  end

  json.other_user do
    json.(other_user, :id, :username, :loc_desc)
    @user = other_user
    json.partial! 'api/users/profpic', user: @user
  end
end
