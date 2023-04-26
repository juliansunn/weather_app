"use client";

import React from "react";
import { CompletionTriggerKind } from "typescript";
import TempChart from "./TempChart";
import { Card, Grid } from "@tremor/react";
import RainChart from "./RainChart";
import HumidityChart from "./HumidityChart";

type Props = {
  results: Root;
};

const Charts = ({ results }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Card className="bg-gradient-to-l from-sky-900 to-sky-800">
        <TempChart results={results} />
      </Card>
      <Card className="bg-gradient-to-l from-sky-900 to-sky-800">
        <RainChart results={results} />
      </Card>
      <Card className="bg-gradient-to-l from-sky-900 to-sky-800">
        <HumidityChart results={results} />
      </Card>
    </div>
  );
};

export default Charts;
