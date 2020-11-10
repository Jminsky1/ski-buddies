class MountainShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :size, :mountain_picture, :weather

  has_many :comments

  def weather
    client = OpenWeather.new(object.zip_code)
    weather = client.format_api_weather_response
  
    return weather
  end
end

