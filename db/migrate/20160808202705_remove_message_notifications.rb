class RemoveMessageNotifications < ActiveRecord::Migration
  def change
    drop_table :message_notifications
  end
end
