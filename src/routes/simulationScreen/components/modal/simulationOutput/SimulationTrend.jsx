import React from "react";
import { Line } from "@ant-design/plots";

const SimulationTrend = () => {
  // Chart data
  const data = [
    { category: "Pre-AEP Enrollment (Dec 23)", value: 6743 },
    { category: "Post-AEP Enrollment (Feb 24)", value: 8548 },
    { category: "Simulated Post-AEP Enrollment (Feb 24)", value: 8548 },
  ];

  // Configuration for the chart
  const config = {
    data,
    xField: "category",
    yField: "value",
    smooth: true, // Makes the line smooth
    point: {
      size: 5,
      shape: "circle",
    },
    tooltip: {
      showTitle: false,
      formatter: (datum) => ({
        name: datum.category,
        value: datum.value.toLocaleString(),
      }),
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line {...config} />
    </div>
  );
};

export default SimulationTrend;
