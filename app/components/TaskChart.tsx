"use client";

import { Card } from "@radix-ui/themes";

import { SummaryProps } from "./TaskSummary";

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

const TaskChart = ({ toDo, inProgress, done }: SummaryProps): JSX.Element => {
  const data = [
    { label: "To Do", value: toDo },
    { label: "In Progress", value: inProgress },
    { label: "Done", value: done },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height="300">
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TaskChart;
