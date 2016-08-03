class PhotoRepoPics < ActiveRecord::Migration
  def change
    create_table :photo_repo_pics do |t|
      t.integer :repo_id, null: false
      t.string :url, null: false
    end
    add_index :photo_repo_pics, :repo_id
  end
end
