json.array! (@likes) do |like|
  json.id like.id
  json.user_id like.user_from_id
  json.username like.liker.username
end
