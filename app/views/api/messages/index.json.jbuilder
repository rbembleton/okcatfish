json.array!(@threads) do |thread|
  @thread = thread
  other_user = @thread.users.first.id == current_user.id ? @thread.users.second : @thread.users.first

  json.id @thread.id
  json.created_at @thread.created_at
  json.updated_at @thread.updated_at

  json.most_recent_message do
    json.(@thread.most_recent_message, :id, :body, :is_read)
    json.time_ago time_ago_in_words(@thread.most_recent_message.created_at)
    json.author @thread.most_recent_message.author.username
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
end
