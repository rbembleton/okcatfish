json.array!(@users) do |user|
  json.(user, :id, :username, :gender, :age, :loc_desc)
  json.prof_pic do
    if user.prof_pic
      json.url asset_path(user.prof_pic.url)
    else
      json.url asset_path(((user.id % 2 == 0) ? "cat_" : "fish_") + (user.id % 5 + 1).to_s + ".jpg")
    end
  end
end
