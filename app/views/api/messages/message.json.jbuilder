json.(@message, :body, :author_id, :is_read, :notification, :thread_id)
json.author @message.author.username
json.time_ago time_ago_in_words(@message.created_at)
json.thread do
  other_user = @message.thread.users.first.id == current_user.id ? @message.thread.users.second : @message.thread.users.first
  json.(@message.thread, :id)
  json.other_user do
    json.(other_user, :id, :username, :loc_desc, :gender, :age)
    @user = other_user
    json.partial! 'api/users/profpic', user: @user
  end
end
