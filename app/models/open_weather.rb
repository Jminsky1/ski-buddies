class OpenWeather

  def initialize(zip_code)
    @mountain_zip = zip_code
  end
  
  def format_api_weather_response
    parsed_weather = parse_api_weather_response
      return {
        conditions: parsed_weather["weather"][0]["main"],
        icon: parsed_weather["weather"][0]["icon"],
        temp: parsed_weather["main"]["temp"],
        low: parsed_weather["main"]["temp_min"],
        high: parsed_weather["main"]["temp_max"],
        date: Time.at(parsed_weather["dt"]).strftime("%a %b %d"),
        description: parsed_weather["weather"][0]["description"],
        wind: parsed_weather["wind"]["speed"],
        visibility: parsed_weather["visibility"],
        # snow: parsed_weather["snow"]["3h"]
      }
  end

  private

  def fetch_weather
    domain = "https://api.openweathermap.org/data/2.5/"
    query = "weather?zip=#{@mountain_zip}&appid=#{ENV["OPEN_WEATHER_KEY"]}"
    url = domain + query

    api_weather_response = Faraday.get(url)

    return api_weather_response
  end

  def parse_api_weather_response
    weather_response_body = fetch_weather.body
    parsed_weather_json = JSON.parse(weather_response_body)

    return parsed_weather_json
  end
end