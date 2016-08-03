# == Schema Information
#
# Table name: user_profiles
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  location      :integer          not null
#  birthdate     :datetime         not null
#  orientation   :string           not null
#  gender        :string           not null
#  lf_bottom_age :integer          not null
#  lf_top_age    :integer          not null
#  created_at    :datetime
#  updated_at    :datetime
#

class UserProfile < ActiveRecord::Base

  validates :user_id, presence: true, uniqueness: true
  validates :location,
    :birthdate,
    :orientation,
    :gender,
    :lf_bottom_age,
    :lf_top_age,
    presence: true

  validates_inclusion_of :gender, in: %w(male female)
  validates_inclusion_of :orientation, in: %w(straight gay lesbian bisexual)

  after_initialize :default_looking_for_ages
  after_commit :create_profile_text

  belongs_to(:user)

  def default_looking_for_ages
    self.lf_bottom_age = self.age * 5/6 > 18 ? self.age * 5/6 : 18
    self.lf_top_age = self.age * 6/5
  end

  def age
    now = Time.now.utc.to_date
    now.year - self.birthdate.year - (self.birthdate.to_date.change(:year => now.year) > now ? 1 : 0)
  end

  def create_profile_text
    ProfileText.create!({ user_id: self.user_id })
  end

end
