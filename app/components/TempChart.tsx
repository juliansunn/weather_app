"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

const TempChart = ({ results }: Props) => {
  const hourly = results.hourly.time.map((time) =>
    new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false })
  );

  const data = hourly
    .map((hour, i) => ({
      time: Number(hour),
      "Wind Speed (m/s)": results.hourly.windspeed_80m[i],
      "Temperature (F)": results.hourly.temperature_2m[i],
    }))
    .slice(0, 24);

  const dataFormatter = (value: number) => `${value} °F`;
  return (
    <Card>
      <Title>Temp & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature (F)", "Wind Speed (m/s)"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TempChart;
