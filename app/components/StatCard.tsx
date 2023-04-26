"use client";

import { Card, Metric, Text, Color } from "@tremor/react";

type Props = {
  title: string;
  metric: string;
  color: Color;
};

const StatCard = ({ title, metric, color }: Props) => {
  return (
    <Card
      className="bg-gradient-to-l from-sky-900 to-sky-800"
      decoration="top"
      decorationColor={color}
    >
      <Text className="text-slate-400">{title}</Text>
      <Metric className="text-white">{metric}</Metric>
    </Card>
  );
};

export default StatCard;
