class FixFloatLatLong < ActiveRecord::Migration
  def change
    remove_column :users, :lat
    remove_column :users, :lng
    add_column :users, :lat, :float, null: false
    add_column :users, :lng, :float, null: false
    add_index :users, :lat
    add_index :users, :lng
  end
end
