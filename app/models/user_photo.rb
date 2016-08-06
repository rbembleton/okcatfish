# == Schema Information
#
# Table name: user_photos
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  created_at         :datetime
#  updated_at         :datetime
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class UserPhoto < ActiveRecord::Base
  validates :user_id, presence: true;

  has_attached_file :image, default_url: "empty_profile.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to(:user)

  # before_create :ensure_image

  # def ensure_image
  #   unless self.image.url != "empty_profile.png"
  #     random_pic = ["cat_1.jpg", "cat_2.jpg", "cat_3.jpg", "cat_4.jpg", "cat_5.jpg"].sample
  #     self.image = File.open("app/assets/images/#{random_pic}")
  #   end
  # end

end
