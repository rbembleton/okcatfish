class CreateThreads < ActiveRecord::Migration
  def change
    create_table :threads do |t|
      t.integer :user1_id, null: false
      t.integer :user2_id, null: false

      t.timestamps
    end
    add_index :threads, :user1_id
    add_index :threads, :user2_id
  end
end
