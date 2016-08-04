json.array!(@users) do |user|
  json.(user, :id, :username, :gender, :age, :loc_desc)
  json.prof_pic do
    if user.prof_pic
      json.url user.prof_pic.url
    else
      json.url asset_path('empty_profile.png')
    end
  end
end
