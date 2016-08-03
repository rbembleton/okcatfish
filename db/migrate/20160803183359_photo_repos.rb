class PhotoRepos < ActiveRecord::Migration
  def change
    create_table :photo_repos do |t|
      t.string :label, null: false
    end
    add_index :photo_repos, :label
  end
end
