json.user_id @user_response.user_id

json.question do

  json.(@user_response.question, :id, :body)
  json.answers (@user_response.question.answers) do |answer|
    json.(answer, :id, :body, :order)
  end

end


json.(@user_response, :id, :answer_id, :weight, :explanation)

json.match_responses (@user_response.user_match_responses) do |user_match_response|
  json.(user_match_response, :id, :answer_id)
end
