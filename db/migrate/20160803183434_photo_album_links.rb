class PhotoAlbumLinks < ActiveRecord::Migration
  def change
    create_table :photo_album_links do |t|
      t.integer :user_id, null: false
      t.integer :photo_repo_pic_id, null: false
    end
    add_index :photo_album_links, :user_id
    add_index :photo_album_links, :photo_repo_pic_id
  end
end
