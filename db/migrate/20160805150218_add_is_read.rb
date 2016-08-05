class AddIsRead < ActiveRecord::Migration
  def change
    add_column :messages, :is_read, :boolean, null: false, default: false
  end
end
