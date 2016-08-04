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
    json.url user.prof_pic.url
  else
    json.url asset_path('empty_profile.png')
  end
end
