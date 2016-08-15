json.array!(@users) do |user|
  @user = user
  json.(@user, :id, :username, :gender, :age, :loc_desc)
  json.match_percentage @match_percentage_hash[@user.id]
  json.partial! 'api/users/profpic', user: @user
end
