json.partial! 'api/users/user', user: @user

json.(@user, :location, :age, :lf_bottom_age, :lf_top_age, :gender, :orientation)
