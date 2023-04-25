import { gql } from "@apollo/client";

const fetchWeatherQuery = gql`
  query myQuery(
    $current_weather: String
    $daily: String = "apparent_temperature_max,apparent_temperature_min,sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_clear_sky_max,uv_index_max,weathercode"
    $hourly: String = "apparent_temperature,dewpoint_2m,precipitation,precipitation_probability,rain,relativehumidity_2m,showers,snow_depth,snowfall,temperature_2m,temperature_80m,winddirection_80m,windgusts_10m,windspeed_80m"
    $latitude: String!
    $longitude: String!
    $timezone: String!
    $temperature_unit: String
    $past_days: String


  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      hourly: $hourly
      latitude: $latitude
      longitude: $longitude
      timezone: $timezone
      temperature_unit: $temperature_unit
      past_days: $past_days
    ) {
      current_weather {
        is_day
        temperature
        time
        weathercode
        winddirection
        windspeed
      }
      daily {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        uv_index_clear_sky_max
        uv_index_max
        weathercode
        time
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        uv_index_clear_sky_max
        uv_index_max
        weathercode
        time
      }
      hourly {
        apparent_temperature
        dewpoint_2m
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        temperature_80m
        winddirection_80m
        windgusts_10m
        windspeed_80m
        time
      }
      hourly_units {
        apparent_temperature
        dewpoint_2m
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        temperature_80m
        winddirection_80m
        windgusts_10m
        windspeed_80m
        time
      }
      latitude
      longitude
      timezone
    }
  }
`;

export default fetchWeatherQuery;
