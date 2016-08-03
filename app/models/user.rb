# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  location        :integer          not null
#  birthdate       :datetime         not null
#  orientation     :string           not null
#  gender          :string           not null
#  lf_bottom_age   :integer          not null
#  lf_top_age      :integer          not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, length: { maximum: 20, minimum: 4 }
  validates :password, length: { minimum: 6, allow_nil: true }

  validates :location,
    :birthdate,
    :orientation,
    :gender,
    :lf_bottom_age,
    :lf_top_age,
    presence: true

  validates_inclusion_of :gender, in: %w(male female)
  validates_inclusion_of :orientation, in: %w(straight gay lesbian bisexual)

  attr_reader :password

  after_initialize :ensure_session_token
  after_initialize :default_looking_for_ages
  after_commit :create_profile_text

  has_one(:profile_text)

### AUTH VVV

    def self.generate_session_token
      token = SecureRandom.urlsafe_base64(16)
        while User.exists?(session_token: token)
          token = SecureRandom.urlsafe_base64(16)
        end
      token
    end

    def self.find_by_credentials(credentials)
      user = User.find_by(username: credentials[:username])
      return user if user && user.valid_password?(credentials[:password])
    end

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
      self.session_token = User.generate_session_token
      self.save!
      self.session_token
    end

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end

    def valid_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end

### AUTH ^^^


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
