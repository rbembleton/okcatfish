json.user_id @user_responses.user_id

json.question (@user_response.question) do |question|

  json.(question, :id, :body)
  json.answers (question.answers) do |answer|
    json.(answer, :id, :body)
  end

end

json.response (@user_response) do
  json.(@user_response, :id, :answer_id, :weight, :explanation)
end

json.match_responses (@user_response.user_match_responses) do |user_match_response|
  json.(user_match_response, :id, :answer_id, :explanation)
end
