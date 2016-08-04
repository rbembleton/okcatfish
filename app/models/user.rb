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
#  loc_desc        :string           not null
#  lat             :float            not null
#  lng             :float            not null
#

class User < ActiveRecord::Base
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, :lat, :lng, :loc_desc, presence: true
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
  # after_initialize :ensure_lat_lng_loc_desc
  after_create :create_profile_text

  has_one(:profile_text)

  has_many(:photo_album_links)

  has_many(
    :repo_photos,
    through: :photo_album_links,
    source: :photo_repo_pic
  )


  def self.find_users_by_location_and_proximity(lat, lng, miles)


  end

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
    return nil unless birthdate
    return if self.lf_bottom_age && self.lf_top_age
    self.lf_bottom_age = self.age * 5/6 > 18 ? self.age * 5/6 : 18
    self.lf_top_age = self.age * 6/5
  end

  def age
    return nil unless birthdate
    now = Time.now.utc.to_date
    now.year - self.birthdate.year - (self.birthdate.to_date.change(:year => now.year) > now ? 1 : 0)
  end

  def create_profile_text
    ProfileText.create!({ user_id: self.id })
  end

  def photos
    self.repo_photos
  end

  def prof_pic
    self.photos.first || { url: "http://www.ogubin.com/images/empty_profile2.png" }
  end

  # def ensure_lat_lng_loc_desc
  #   return if self.lat && self.lng && self.loc_desc
  #   set_lat_lng_loc_desc
  #
  # end

  def set_lat_lng_loc_desc(zip)
    response = RestClient.get("http://maps.googleapis.com/maps/api/geocode/json?address=#{zip}&sensor=true")
    body_json = (JSON.parse response.body)["results"][0]

    self.loc_desc = get_locality(body_json["address_components"])
    self.loc_desc += ", " + get_state(body_json["address_components"])
    self.lat = body_json["geometry"]["location"]["lat"]
    self.lng = body_json["geometry"]["location"]["lng"]
  end

  def zip=(zip)
    self.location = zip unless self.location == zip
    set_lat_lng_loc_desc(zip)
  end


  def get_locality(contents)
    contents.each do |content|
      if content["types"].include?("locality") || content["types"].include?("sublocality")
        return content["short_name"]
      end
    end
  end

  def get_state(contents)
    contents.each do |content|
      if content["types"].include?("administrative_area_level_1") ||
        content["types"].include?("country")
        return content["short_name"]
      end
    end
  end




end
