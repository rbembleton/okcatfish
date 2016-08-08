json.array!(@threads) do |message_thread|
  other_user = message_thread.users.first.id == current_user.id ? message_thread.users.second : message_thread.users.first
  json.(message_thread, :id, :created_at, :updated_at)


  json.most_recent_message do
    json.id message_thread.messages.last.id
    json.body message_thread.messages.last.body
    json.is_read message_thread.messages.last.is_read
    json.time_ago time_ago_in_words(message_thread.messages.last.created_at)
    json.author message_thread.messages.last.author.username
    json.notification message_thread.messages.last.notification
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
