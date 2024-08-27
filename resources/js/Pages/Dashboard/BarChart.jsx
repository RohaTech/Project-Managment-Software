import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "    ",
  },
  legend: { position: "none" },
};

export function BarChart({ personalTasksStats }) {
  const data = [
    ["Task Status", "Count"],
    ["Completed", personalTasksStats.taskCompleted],
    ["Pending", personalTasksStats.taskPending],
    ["In Progress", personalTasksStats.taskInprogress],
    ["Cancelled", personalTasksStats.taskCancelled],
  ];

  return (
    <div className=" min-w-[560px]  text-primary p-2 rounded-sm border border-stroke   shadow-default   relative  ">
      <h1 className="absolute z-30 text-primary font-bold text-xl top-2 left-48">
        Personal Tasks Stats
      </h1>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
