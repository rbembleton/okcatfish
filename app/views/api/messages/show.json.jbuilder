other_user = @thread.users.first.id == current_user.id ? @thread.users.second : @thread.users.first
# debugger
json.(@thread, :id, :created_at, :updated_at)

json.messages (@thread.messages) do |message|
  json.(message, :body, :author_id, :notification)
  json.author message.author.username
  json.time_ago time_ago_in_words(message.created_at)
  json.is_read message.is_read
end

json.other_user do
  json.(other_user, :id, :username, :loc_desc, :gender, :age)
  @user = other_user
  json.partial! 'api/users/profpic', user: @user
end

# json.prof_pic do
#   if user.prof_pic
#     json.url user.prof_pic.url
#   else
#     json.url asset_path(((user.id % 2 == 0) ? "cat_" : "fish_") + (user.id % 5 + 1).to_s + ".jpg")
#   end
# end
