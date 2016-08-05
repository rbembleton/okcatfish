class RemoveLatLngLoc < ActiveRecord::Migration
  def change
    remove_column :users, :location
    remove_column :users, :lat
    remove_column :users, :lng
    remove_column :users, :loc_desc
  end
end
