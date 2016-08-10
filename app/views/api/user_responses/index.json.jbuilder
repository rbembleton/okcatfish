json.user_id @user_responses.first.user_id

json.user_responses (@user_responses) do |user_response|

  json.question do

    json.(user_response.question, :id, :body)
    json.answers (user_response.question.answers) do |answer|
      json.(answer, :id, :body, :order)
    end

  end


  json.(user_response, :id, :answer_id, :weight, :explanation)


end
