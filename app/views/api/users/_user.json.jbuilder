json.(user, :id, :username)


json.(user,
  :location,
  :age,
  :lf_bottom_age,
  :lf_top_age,
  :gender,
  :orientation,
  :profile_text,
  :lat,
  :lng,
  :loc_desc
)
#
# json.(user, prof_pic: do
#   {url: (image_url 'empty_profile.png')}
# end)

json.prof_pic do
  if user.prof_pic
    if user.prof_pic.class == PhotoRepoPic
      json.url user.prof_pic.url
    else
      json.url user.prof_pic.image.url
    end
  else
    json.url asset_path(((user.id % 2 == 0) ? "cat_" : "fish_") + (user.id % 5 + 1).to_s + ".jpg")
  end
end
