class CreateZipLatLongReference < ActiveRecord::Migration
  def change
    create_table :zip_lat_long_references do |t|
      t.integer :zip_code, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :description, null: false
    end
  end
end
