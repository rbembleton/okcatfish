class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :body
      t.string :category
      t.integer :order
    end
    add_index :questions, :order
    add_index :questions, :category
  end
end
