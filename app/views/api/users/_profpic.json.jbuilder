json.prof_pic do
  if user.prof_pic
    if user.prof_pic.class == PhotoAlbumLink
      json.url user.prof_pic.photo_repo_pic.url
    else
      json.url user.prof_pic.image.url
    end
  else
    json.url asset_path(((user.id % 2 == 0) ? "cat_" : "fish_") + (user.id % 5 + 1).to_s + ".jpg")
  end
end
