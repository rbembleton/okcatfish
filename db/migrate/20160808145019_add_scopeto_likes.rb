class AddScopetoLikes < ActiveRecord::Migration
  def change
    add_index :likes, [:user_to_id, :user_from_id], unique: true
  end
end
