# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  birthdate       :datetime         not null
#  orientation     :string           not null
#  gender          :string           not null
#  lf_bottom_age   :integer          not null
#  lf_top_age      :integer          not null
#  created_at      :datetime
#  updated_at      :datetime
#  location_id     :integer          not null
#  lat             :float            not null
#  lng             :float            not null
#

class User < ActiveRecord::Base

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, length: { maximum: 16, minimum: 4 }
  validates :password, length: { minimum: 6, allow_nil: true }

  validates :birthdate,
    :orientation,
    :gender,
    :lf_bottom_age,
    :lf_top_age,
    :lat,
    :lng,
    presence: true

  # geo kit gem
  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :lat,
                   :lng_column_name => :lng

  validates_inclusion_of :gender, in: %w(male female)
  validates_inclusion_of :orientation, in: %w(straight gay lesbian bisexual)

  attr_reader :password

  after_initialize :ensure_session_token

  after_initialize :default_looking_for_ages
  after_create :create_profile_text


### ASSOCIATIONS

  has_one(:profile_text)

  has_many(:photo_album_links)

  has_many(
    :repo_photos,
    through: :photo_album_links,
    source: :photo_repo_pic
  )

  has_many(
    :user_photos
  )

  belongs_to(
    :location,
    class_name: "ZipLatLngReference",
    foreign_key: :location_id,
    primary_key: :id
  )

  has_many(
    :thread_user_links,
    class_name: "ThreadUserLink",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :threads,
    through: :thread_user_links,
    source: :thread
  )

  has_many(
    :messages,
    through: :threads,
    source: :messages
  )

  has_many(
    :from_likes,
    class_name: "Like",
    foreign_key: :user_from_id,
    primary_key: :id
  )

  has_many(
    :to_likes,
    class_name: "Like",
    foreign_key: :user_to_id,
    primary_key: :id
  )

  has_many(
    :likes,
    through: :from_likes,
    source: :likee
  )

  has_many(
    :likers,
    through: :to_likes,
    source: :liker
  )

  has_many(
    :user_responses,
    class_name: "UserResponse",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :questions_answered,
    through: :user_responses,
    source: :question
  )


### CUSTOM QUERIES

  def self.find_by_looking_for(gender, orientation)
    if gender == "female"
      if orientation == "lesbian"
        User.where(gender: "female", orientation: ["bisexual","lesbian"])
      elsif orientation == "straight"
        User.where(gender: "male", orientation: ["straight", "bisexual"])
      elsif orientation == "bisexual"
        User.where(
          "(gender = ? AND orientation IN (?,?)) OR
          (gender = ? AND orientation IN (?,?))",
          'female', 'lesbian', 'bisexual',
          'male', 'straight', 'bisexual')
      end
    elsif gender == "male"
      if orientation == "gay"
        User.where(gender: "male", orientation: ["bisexual", "gay"])
      elsif orientation == "straight"
        User.where(gender: "female", orientation: ["straight", "bisexual"])
      elsif orientation == "bisexual"
        User.where(
          "(gender = ? AND orientation IN (?,?)) OR
          (gender = ? AND orientation IN (?,?))",
          'male', 'gay', 'bisexual',
          'female', 'straight', 'bisexual')
      end
    end
  end


### AUTH

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

## AGE

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


## PROFILE TEXT

  def create_profile_text
    ProfileText.create!({ user_id: self.id })
    # UserPhoto.create!({ user_id: self.id })
  end



## PROFILE PHOTOS

  def photos
    self.user_photos.to_a.map { |photo| photo.image } +
    self.repo_photos.to_a
  end

  def prof_pic
    self.photos.sample #|| image_url "empty_profile.png"
  end

  def add_pic(data)
    up = UserPhoto.new(user_id: self.id)
    up.image = data
    up.save! if up.image.url != "empty_profile.png"
  end

  def remove_pic(up_id)
    up = UserPhoto.find(up_id)
    up.delete! if up.user_id = self.id
  end



## LOCATION

  def zip=(zip)
    if zip.to_s.length == 5
      @zllr = ZipLatLngReference.find_by(zip_code: zip)

      unless @zllr
        @zllr = ZipLatLngReference.create_with_zip(zip)
      end

      self.location_id = @zllr.id
      self.lat = @zllr.lat
      self.lng = @zllr.lng
    end
  end

  def loc_desc
    self.location.description
  end


## MATCH PERCENTAGES

  def calculate_matches(matches)

    ## cache and set up
    cached_user_responses = self.user_responses.includes(user_match_responses: {answer: [:question]})
    cached_user_questions = self.questions_answered
    match_p_hash = {}


    matches.each do |match|
      match_p_hash[match.id] = calculate_single_match(match, cached_user_responses, cached_user_questions)
    end

    match_p_hash

  end


  def calculate_single_match(match, *cache)
    match_weight_arr = []

    if cache.length == 2
      cached_user_responses = cache[0]
      cached_user_questions = cache[1]
    else
      cached_user_responses = self.user_responses.includes(user_match_responses: {answer: [:question]})
      cached_user_questions = self.questions_answered
    end

    cached_user_responses.each do |user_response|

      ## if both user and match answered the same question,
      ## add question to match_p_hash with an array of
      ## weights and whether or not the other had include the response
      ## in their user_match_responses

      if match.questions_answered.exists?(user_response.question.id)
        temp_match_response = match.questions_answered
          .find(user_response.question.id)
          .user_responses.find_by(user_id: match.id)

        # debugger

        does_match_accept_user = temp_match_response.user_match_responses.exists?(answer_id: user_response.answer_id)
        does_user_accept_match = user_response.user_match_responses.exists?(answer_id: temp_match_response.answer_id)

        user_arr = {
          weight: user_response.weight,
          presence_mod: (does_match_accept_user ? 1 : 0)
        }
        match_arr = {
          weight: temp_match_response.weight,
          presence_mod: (does_user_accept_match ? 1 : 0)
        }

        match_weight_arr.push( {user: user_arr, match: match_arr} )
        # eg: {user: [.70, 1], match: [.5, 0]}
      end

    end

    # debugger

    user_total_weight = 0.01
    match_total_weight = 0.01
    user_weighted_sum = 0.00
    match_weighted_sum = 0.00

    match_weight_arr.each do |match_obj|
      user_total_weight += match_obj[:user][:weight]
      match_total_weight += match_obj[:match][:weight]
      user_weighted_sum += (match_obj[:user][:weight] * match_obj[:user][:presence_mod])
      match_weighted_sum += (match_obj[:match][:weight] * match_obj[:match][:presence_mod])
    end

    calc_percentage = ((user_weighted_sum / user_total_weight * 0.5) + (match_weighted_sum / match_total_weight * 0.5))

    (calc_percentage.round(2))

  end






end
