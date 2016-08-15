json.array!(@ordered_keys) do |order_pair|
  #NOTE: order_pairs are [user_id, match_percentage]
  @user = @users.find(order_pair[0])
  json.(@user, :id, :username, :gender, :age, :loc_desc)
  json.match_percentage order_pair[1]
  json.partial! 'api/users/profpic', user: @user
end
