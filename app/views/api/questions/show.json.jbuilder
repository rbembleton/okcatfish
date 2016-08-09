json.(@question, :id, :body)
json.answer @question.answers do |answer|
  json.(answer, :id, :body)
end
