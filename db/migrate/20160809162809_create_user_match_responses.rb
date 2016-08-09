class CreateUserMatchResponses < ActiveRecord::Migration
  def change
    create_table :user_match_responses do |t|
      t.integer :user_response_id, null: false
      t.integer :answer_id, null: false
    end
    add_index :user_match_responses, :user_response_id
    add_index :user_match_responses, :answer_id
  end
end
