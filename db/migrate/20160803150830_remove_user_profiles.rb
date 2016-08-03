class RemoveUserProfiles < ActiveRecord::Migration
  def change
    remove_table :user_profiles
  end
end
