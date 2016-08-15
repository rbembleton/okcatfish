json.partial! 'api/users/user', user: @user
json.partial! 'api/users/profpic', user: @user

if @user.id != current_user.id
  json.match_percentage @match_p
end
