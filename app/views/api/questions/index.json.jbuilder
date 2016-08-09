json.array! @questions do |question|
  json.(question, :id, :body)
  json.answers (question.answers) do |answer|
    json.(answer, :id, :body)
  end
end
