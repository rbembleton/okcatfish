class CreateMessageNotifications < ActiveRecord::Migration
  def change
    create_table :message_notifications do |t|
      t.integer :thread_id, null: false
      t.text :body
    end

    add_index :message_notifications, :thread_id
  end
end
