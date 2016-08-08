class UpdateMessageNotifications < ActiveRecord::Migration
  def change
    change_table :message_notifications do |t|
      t.timestamps
    end
  end
end
