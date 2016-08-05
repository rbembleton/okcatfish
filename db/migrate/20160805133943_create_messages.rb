class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :thread_id, null: false
      t.integer :author_id, null: false
      t.text :body, null: false, default: ""
      
      t.timestamps
    end
    add_index :messages, :thread_id
    add_index :messages, :author_id
  end
end
