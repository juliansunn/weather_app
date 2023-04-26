"use client";

import React, { useEffect, useState } from "react";
import { Country, City, State } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";
import InformationPanel from "./InformationPanel";

type option = {
  value?: {
    latitude?: string | null;
    longitude?: string | null;
    isoCode?: string | null;
  };
  label?: string | null;
};

type cityOption = {
  value?: {
    latitude?: string | null;
    longitude?: string | null;
    countryCode?: string | null;
    name?: string | null;
    stateCode?: string | null;
  };
  label?: string | null;
};

function getCitiesFromState(
  countryCode: string,
  stateCode: string
): cityOption[] | [] {
  const cities = City.getCitiesOfState(countryCode, stateCode);
  const cityOptions = cities.map((city) => ({
    value: {
      latitude: city.latitude,
      longitude: city.longitude,
      countryCode: city.countryCode,
      name: city.name,
      stateCode: city.stateCode,
    },
    label: city.name,
  }));
  return cityOptions;
}

function getCityOptions(isoCode: string) {
  if (!isoCode) {
    return [];
  }
  const cities = City.getCitiesOfCountry(isoCode) || [];
  if (cities.length === 0) {
    return [];
  }
  const cityOptions = cities.map((city) => ({
    value: {
      latitude: city.latitude,
      longitude: city.longitude,
      countryCode: city.countryCode,
      name: city.name,
      stateCode: city.stateCode,
    },
    label: city.name,
  }));
  return cityOptions || [];
}

function getStateOptions(countryCode: string): option[] | [] {
  if (!countryCode) {
    return [];
  }
  const cities = State.getStatesOfCountry(countryCode);
  const stateOptions =
    cities.map((state) => ({
      value: {
        latitude: state.latitude,
        longitude: state.longitude,
        isoCode: state.isoCode,
      },
      label: state.name,
    })) || [];
  return stateOptions;
}

const options = Country.getAllCountries().map((place) => ({
  value: {
    latitude: place.latitude,
    longitude: place.longitude,
    isoCode: place.isoCode,
  },
  label: place.name,
}));

const CityPicker = () => {
  const [selectedCountry, setSelectedCountry] = useState<option | null>(null);
  const [selectedState, setSelectedState] = useState<option | null>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption | null>(null);
  const [stateOptions, setStateOptions] = useState<option[] | []>([]);
  const [cityOptions, setCityOptions] = useState<cityOption[] | []>([]);
  const router = useRouter();

  const handleSelectedCountry = (option: option | null) => {
    const isoCode = option?.value?.isoCode;
    if (isoCode) {
      setStateOptions([]);
      setSelectedCountry(option);
      const stateOpts: option[] | [] = getStateOptions(isoCode);
      if (stateOpts.length !== 0) {
        setStateOptions(stateOpts);
        setCityOptions([]);
      } else {
        const cityOpts = getCityOptions(isoCode);
        setCityOptions(cityOpts);
      }
      setSelectedState(null);
      setSelectedCity(null);
    }
  };

  const handleSelectedState = (stateOption: option | null) => {
    const countryIsoCode = selectedCountry?.value?.isoCode;
    const stateIsoCode = stateOption?.value?.isoCode;
    setSelectedState(stateOption);
    if (countryIsoCode && stateIsoCode) {
      const cityOpts: cityOption[] = getCitiesFromState(
        countryIsoCode,
        stateIsoCode
      );
      setCityOptions(cityOpts);
    }
  };

  const handleSelectedCity = (option: cityOption | null) => {
    if (option) {
      setSelectedCity(option);
      router.push(
        `/location/${option?.value?.name}/${option?.value?.stateCode}/${option?.value?.countryCode}/${option?.value?.latitude}/${option?.value?.longitude}`
      );
    }
  };

  useEffect(() => {
    const defaultOption: option | null =
      options.find((option) => option.value.isoCode === "US") || null;
    handleSelectedCountry(defaultOption);
  }, []);

  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>

        <Select
          className="text-black"
          options={options}
          value={selectedCountry}
          onChange={handleSelectedCountry}
        />
      </div>
      {stateOptions.length !== 0 && (
        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">State</label>
          </div>

          <Select
            className="text-black"
            options={stateOptions}
            value={selectedState}
            onChange={handleSelectedState}
          />
        </div>
      )}
      {cityOptions.length !== 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">City</label>
          </div>

          <Select
            className="text-black"
            options={cityOptions}
            value={selectedCity}
            onChange={handleSelectedCity}
          />
        </div>
      )}
    </div>
  );
};

export default CityPicker;
