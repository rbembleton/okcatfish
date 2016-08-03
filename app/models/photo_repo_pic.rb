# == Schema Information
#
# Table name: photo_repo_pics
#
#  id      :integer          not null, primary key
#  repo_id :integer          not null
#  url     :string           not null
#

class PhotoRepoPic < ActiveRecord::Base

  validates :repo_id, :url, presence: true

  has_many(:photo_album_links)

  belongs_to(
    :photo_repo,
    class_name: "PhotoRepo",
    foreign_key: :repo_id,
    primary_key: :id
  )

end
