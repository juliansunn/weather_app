// import weatherCodeToString from "@/lib/WeatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";
import weatherCodeToString from "@/lib/weatherCodeToString";

type Props = {
  city: string;
  state: string;
  country: string;
  lat: string;
  long: string;
  results: Root;
};

const InformationPanel = ({
  city,
  state,
  country,
  lat,
  long,
  results,
}: Props) => {
  return (
    <div className="bg-gradient-to-br from-sky-800 to-sky-900 text-white p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">
          {decodeURI(city)}, {decodeURI(state)}, {decodeURI(country)}
        </h1>
        <p className="text-xs text-gray-400">
          Lat/Long: {lat}, {long}
        </p>
      </div>
      <CityPicker />
      <hr className="my-10" />
      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>

        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleDateString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      <hr className="mt-10 mb-5" />
      <div>
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[results.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[results.current_weather.weathercode].label}
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between space-x-10">
            <p className="text-6xl font-semibold">
              {results.current_weather.temperature.toFixed(1)}
              °F
            </p>
            <p className="text-right font-extralight text-lg">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 py-5">
        <div className="flex items-center justify-between space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-sky-700">
          <SunIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunrise</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunrise[0]).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-sky-700">
          <MoonIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunset</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunset[0]).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
