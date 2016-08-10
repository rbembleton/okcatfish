json.partial! 'api/users/user', user: @user

# json.(@user, :location, :age, :lf_bottom_age, :lf_top_age, :gender, :orientation, :prof_pic, :profile_text)

if @user.id != current_user.id
  json.match_percentage @match_p
end
