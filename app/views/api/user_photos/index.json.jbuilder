if @photos.length == 0
  json.array!(["no_photo"]) do
    json.url asset_path(((@user.id % 2 == 0) ? "cat_" : "fish_") + (@user.id % 5 + 1).to_s + ".jpg")
    json.photo_type 'default'
    json.id nil
  end
else
  json.array!(@photos) do |photo|
    json.id photo.id
    if photo.class == PhotoAlbumLink
      json.url photo.photo_repo_pic.url
      json.photo_type 'repo'
    else
      json.url photo.image.url
      json.photo_type 'user'
    end
  end
end
