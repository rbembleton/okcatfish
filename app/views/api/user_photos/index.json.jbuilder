json.array!(@photos) do |photo|
  json.(photo, :url)
end
