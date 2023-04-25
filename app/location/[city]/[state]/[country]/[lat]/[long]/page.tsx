import { getClient } from "@/apollo-client";
import CalloutCard from "@/app/components/CalloutCard";
import HumidityChart from "@/app/components/HumidityChart";
import InformationPanel from "@/app/components/InformationPanel";
import RainChart from "@/app/components/RainChart";
import StatCard from "@/app/components/StatCard";
import TempChart from "@/app/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";

// revalidate cached queries every 60 seconds
export const revalidate = 60;

type Props = {
  params: {
    city: string;
    state: string;
    country: string;
    lat: string;
    long: string;
  };
};

const WeatherPage = async ({
  params: { city, state, country, lat, long },
}: Props) => {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "PST",
      temperature_unit: "fahrenheit",
    },
  });

  const results: Root = data.myQuery;
  const uvIndexMax: number = Number(results.daily.uv_index_max[0]);

  const dataToSend = cleanData(results, city);

  // const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ weatherData: dataToSend }),
  // });

  // const GPTData = await res.json();
  // const { content } = GPTData;
  const content = "GPT SUmmary Placeholder";
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel
        city={city}
        state={state}
        country={country}
        lat={lat}
        long={long}
        results={results}
      />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-2xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString()}
            </p>
          </div>
          <div className="m-2 mb-10">
            <CalloutCard message={content} warning={false} />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Max. Temperature"
              metric={`${Number(results.daily.temperature_2m_max[0]).toFixed(
                1
              )} °F`}
              color="yellow"
            />
            <StatCard
              title="Min. Temperature"
              metric={`${Number(results.daily.temperature_2m_min[0]).toFixed(
                1
              )} °F`}
              color="green"
            />
            <div>
              <StatCard
                title="UV Index"
                metric={uvIndexMax.toFixed(1)}
                color="red"
              />
              {uvIndexMax > 5 && (
                <CalloutCard
                  message="The UV is high today, please be sure to wear sunscreen"
                  warning
                />
              )}
            </div>
            <div className="flex space-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)} m/s`}
                color="green"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="green"
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        <div className="space-y-3">
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
