json.(@message, :body, :author_id, :is_read, :notification, :thread_id)
json.author @message.author.username
json.time_ago time_ago_in_words(@message.created_at)
