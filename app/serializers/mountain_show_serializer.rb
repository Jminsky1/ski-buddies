class MountainShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :size, :mountain_picture

  has_many :comments
end

def weather
  client = OpenWeatherClient.new(object.zip_code)
  weather = client.format_weather_api_response

  return weather
end