other_user = @thread.users.first.id == current_user.id ? @thread.users.second : @thread.users.first

json.(@thread, :id, :created_at)

json.messages @thread.messages do |message|
  json.(message, :body, :author_id)
  json.author message.author.username
  json.time_ago time_ago_in_words(message.created_at)
end

json.other_user do
  json.(other_user, :id, :username, :loc_desc)
  json.prof_pic do
    if other_user.prof_pic
      json.url other_user.prof_pic.url
    else
      json.url asset_path(((other_user.id % 2 == 0) ? "cat_" : "fish_") + (other_user.id % 5 + 1).to_s + ".jpg")
    end
  end
end
