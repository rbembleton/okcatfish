class AddFlagToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :notification, :boolean, default: false
  end
end
