# == Schema Information
#
# Table name: zip_lat_lng_references
#
#  id          :integer          not null, primary key
#  zip_code    :integer          not null
#  lat         :float            not null
#  lng         :float            not null
#  description :string           not null
#

class ZipLatLngReference < ActiveRecord::Base
  validates :zip_code, :lat, :lng, :description, presence: true

  has_many(
    :users,
    class_name: "User",
    foreign_key: :location_id,
    primary_key: :id
  )


  def self.get_locality(contents)
    contents.each do |content|
      if content["types"].include?("locality") || content["types"].include?("sublocality")
        return content["short_name"]
      end
    end
  end

  def self.get_state(contents)
    contents.each do |content|
      if content["types"].include?("administrative_area_level_1") ||
        content["types"].include?("country")
        return content["short_name"]
      end
    end
  end

  def self.create_with_zip(zip)

    response = RestClient.get("http://maps.googleapis.com/maps/api/geocode/json?address=#{zip}&sensor=true")
    body_json = (JSON.parse response.body)["results"][0]
    description = ZipLatLngReference.get_locality(body_json["address_components"])
    description += ", " + ZipLatLngReference.get_state(body_json["address_components"])
    lat = body_json["geometry"]["location"]["lat"]
    lng = body_json["geometry"]["location"]["lng"]

    ZipLatLngReference.create!(zip_code: zip, lat: lat, lng: lng, description: description)

  end


end
