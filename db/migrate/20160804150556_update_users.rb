class UpdateUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.integer :lat, null: false
      t.integer :lng, null: false
      t.string :loc_desc, null: false
    end

    add_index :users, :lat
    add_index :users, :lng
  end
end
