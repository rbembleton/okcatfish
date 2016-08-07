

if @photos.length == 0
  json.array!(["no_photo"]) do
    json.url asset_path(((@user.id % 2 == 0) ? "cat_" : "fish_") + (@user.id % 5 + 1).to_s + ".jpg")
  end
else
  json.array!(@photos) do |photo|
    json.(photo, :url)
  end
end
