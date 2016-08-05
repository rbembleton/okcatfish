class FixUsersAddLatLngBack < ActiveRecord::Migration
  def change
    add_column :users, :lat, :float, null: false
    add_column :users, :lng, :float, null: false
    add_index :users, :lat
    add_index :users, :lng
  end
end
