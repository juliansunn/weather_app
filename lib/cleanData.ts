const cleanData = (data: Root, city: string) => {
    const {
        current_weather,
        timezone,
        hourly,
        hourly_units,
    } = data;

    const { temperature, windspeed, winddirection, weathercode, time} = current_weather;

    const {temperature_2m, snowfall, rain, relativehumidity_2m, precipitation_probability} = hourly;

    return {
        current_weather: {
            temperature,
            windspeed,
            winddirection,
            time,
            weathercode,
        },
        hourly: {
            temperature_2m: temperature_2m.slice(0, 24),
            snowfall: snowfall.slice(0, 24),
            rain: rain.slice(0, 24),
            relativehumidity_2m: relativehumidity_2m.slice(0, 24),
            precipitation_probability: precipitation_probability.slice(0, 24),
        },
        timezone,
        hourly_units,
        city
    }
}

export default cleanData;