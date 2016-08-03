# == Schema Information
#
# Table name: photo_album_links
#
#  id                :integer          not null, primary key
#  user_id           :integer          not null
#  photo_repo_pic_id :integer          not null
#

class PhotoAlbumLink < ActiveRecord::Base

  validates :user_id, :photo_repo_pic_id, presence: true

  belongs_to(:user)
  belongs_to(:photo_repo_pic)

end
