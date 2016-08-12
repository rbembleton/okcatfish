json.(@photo_repo, :id, :label)

json.pics @photo_repo.pics do |pic|
  json.(pic, :id, :url)
end
