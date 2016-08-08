class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_from_id, null: false
      t.integer :user_to_id, null: false

      t.timestamps
    end
    add_index :likes, :user_from_id
    add_index :likes, :user_to_id
  end
end
