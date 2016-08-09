json.user_id @user_responses.first.user_id

json.user_responses (@user_responses) do |user_response|

  json.question (user_response.question) do |question|

    json.(question, :id, :body)
    json.answers (question.answers) do |answer|
      json.(answer, :id, :body)
    end

  end

  json.response (user_response) do
    json.(user_response, :id, :answer_id, :weight, :explanation)
  end

end
