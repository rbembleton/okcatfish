class CreateProfileTexts < ActiveRecord::Migration
  def change
    create_table :profile_texts do |t|
      t.integer :user_id, null: false
      t.text :about
      t.text :doing
      t.text :faves
      t.text :things
      t.text :think
      t.text :sat_night
      t.text :msg_me_if
    end

    add_index :profile_texts, :user_id, unique: true
  end
end
