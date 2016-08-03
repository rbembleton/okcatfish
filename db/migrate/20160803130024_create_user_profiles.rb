class CreateUserProfiles < ActiveRecord::Migration
  def change
    create_table :user_profiles do |t|
      t.integer :user_id, null: false
      t.integer :location, null: false
      t.datetime :birthdate, null: false
      t.string :orientation, null: false
      t.string :gender, null: false
      t.integer :lf_bottom_age, null: false
      t.integer :lf_top_age, null: false

      t.timestamps
    end

    add_index :user_profiles, :user_id, unique: true
    add_index :user_profiles, :location
    add_index :user_profiles, :gender
    add_index :user_profiles, :orientation
    add_index :user_profiles, :lf_bottom_age
    add_index :user_profiles, :lf_top_age
  end
end
