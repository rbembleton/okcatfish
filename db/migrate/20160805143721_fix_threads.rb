class FixThreads < ActiveRecord::Migration
  def change
    remove_column :message_threads, :user1_id
    remove_column :message_threads, :user2_id
  end
end
