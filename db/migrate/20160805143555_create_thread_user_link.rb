class CreateThreadUserLink < ActiveRecord::Migration
  def change
    create_table :thread_user_links do |t|
      t.integer :user_id, null: false
      t.integer :thread_id, null: false
    end
    add_index :thread_user_links, :user_id
    add_index :thread_user_links, :thread_id
  end
end
