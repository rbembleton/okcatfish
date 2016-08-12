json.array! @photo_repos do |photo_repo|
  json.(photo_repo, :id, :label)
  json.pics photo_repo.pics do |pic|
    json.(pic, :id, :url)
  end
end
