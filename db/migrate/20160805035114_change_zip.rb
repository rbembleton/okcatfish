class ChangeZip < ActiveRecord::Migration
  def change
    rename_table :zip_lat_long_references, :zip_lat_lng_references
  end
end
