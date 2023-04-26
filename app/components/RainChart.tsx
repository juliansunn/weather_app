"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

const RainChart = ({ results }: Props) => {
  const hourly = results.hourly.time.map((time) =>
    new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false })
  );

  const data = hourly
    .map((hour, i) => ({
      time: Number(hour),
      "Rain (%)": results.hourly.precipitation_probability[i],
    }))
    .slice(0, 24);

  const dataFormatter = (value: number) => `${value}`;
  return (
    <Card className="bg-gray-200">
      <Title>Chance of Rain</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Rain (%)"]}
        colors={["blue"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default RainChart;
