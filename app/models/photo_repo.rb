# == Schema Information
#
# Table name: photo_repos
#
#  id    :integer          not null, primary key
#  label :string           not null
#

class PhotoRepo < ActiveRecord::Base

  validates :label, presence: true

  has_many(
    :pics,
    class_name: "PhotoRepoPic",
    foreign_key: :repo_id,
    primary_key: :id
  )

end
