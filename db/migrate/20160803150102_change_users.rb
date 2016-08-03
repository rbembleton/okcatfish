class ChangeUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.integer :location, null: false
      t.datetime :birthdate, null: false
      t.string :orientation, null: false
      t.string :gender, null: false
      t.integer :lf_bottom_age, null: false
      t.integer :lf_top_age, null: false

      t.timestamps
    end

    add_index :users, :location
    add_index :users, :gender
    add_index :users, :orientation
    add_index :users, :lf_bottom_age
    add_index :users, :lf_top_age
  end
end
