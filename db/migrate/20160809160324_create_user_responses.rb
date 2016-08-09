class CreateUserResponses < ActiveRecord::Migration
  def change
    create_table :user_responses do |t|
      t.integer :user_id, null: false
      t.integer :answer_id, null: false
      t.float :weight, null: false, default: 0.5
      t.text :explanation

      t.timestamps
    end

    add_index :user_responses, :user_id
    add_index :user_responses, :answer_id
  end
end
