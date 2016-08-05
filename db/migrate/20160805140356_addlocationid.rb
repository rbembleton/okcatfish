class Addlocationid < ActiveRecord::Migration
  def change
    add_column :users, :location_id, :integer, null: false
    add_index :users, :location_id
  end
end
