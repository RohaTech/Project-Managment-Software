import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  pieHole: 0.5,
  is3D: false,
  title: "Total Tasks Analytics",
  titleTextStyle: { color: "#1868db", fontSize: 20 },
  legend: { position: "bottom", textStyle: { fontSize: 12 } },
};

export function PieChart({ taskStats }) {
  const data = [
    ["Task Status", "Count"],
    ["Completed", taskStats.taskCompleted],
    ["Pending", taskStats.taskPending],
    ["In Progress", taskStats.taskInprogress],
    ["Cancelled", taskStats.taskCancelled], // CSS-style declaration
  ];
  return (
    <div className=" min-w-[560px]   rounded-sm border border-stroke   shadow-default    ">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
