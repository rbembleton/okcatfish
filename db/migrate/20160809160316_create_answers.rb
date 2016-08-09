class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :question_id, null: false
      t.integer :order, null: false
      t.text :body
      t.string :personality_trait
    end
    add_index :answers, :question_id
    add_index :answers, :order
    add_index :answers, :personality_trait
  end
end
