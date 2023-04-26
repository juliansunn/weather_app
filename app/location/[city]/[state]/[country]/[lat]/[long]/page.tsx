import { getClient } from "@/apollo-client";
import CalloutCard from "@/app/components/CalloutCard";
import InformationPanel from "@/app/components/InformationPanel";
import StatCard from "@/app/components/StatCard";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";
import getWindDirection from "@/lib/getWindDirection";
import Charts from "@/app/components/Charts";

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
      timezone: "auto",
      temperature_unit: "fahrenheit",
    },
  });

  const results: Root = data.myQuery;
  const uvIndexMax: number = Number(results.daily.uv_index_max[0]);

  // const dataToSend = cleanData(results, city);

  // const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ weatherData: dataToSend }),
  // });

  // const GPTData = await res.json();
  // const { content } = GPTData;
  const content = "GPT Summary Placeholder";
  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-sky-700">
      <InformationPanel
        city={city}
        state={state}
        country={country}
        lat={lat}
        long={long}
        results={results}
      />

      <div className="flex-1 p-5 lg:p-10">
        <div className="pb-5">
          <div className="pb-5">
            <h2 className="text-2xl font-bold text-white">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString()}
            </p>
          </div>
          <div className="mb-10">
            <CalloutCard message={content} warning={false} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
            <StatCard
              title="Wind Direction & Speed"
              metric={`${getWindDirection(
                results.current_weather.winddirection.toFixed(1)
              )} @ ${results.current_weather.windspeed.toFixed(1)} mph`}
              color="green"
            />
          </div>
        </div>

        <hr className="mb-5" />

        <div className="space-y-3">
          <Charts results={results} />
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
