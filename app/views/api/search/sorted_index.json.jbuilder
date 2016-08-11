json.array!(@ordered_keys) do |order_pair|
  # order_pairs are [user_id, match_percentage]
  user = @users.find(order_pair[0])
  json.(user, :id, :username, :gender, :age, :loc_desc)
  json.match_percentage order_pair[1]
  json.prof_pic do
    if user.prof_pic
      json.url asset_path(user.prof_pic.url)
    else
      json.url asset_path(((user.id % 2 == 0) ? "cat_" : "fish_") + (user.id % 5 + 1).to_s + ".jpg")
    end
  end
end
