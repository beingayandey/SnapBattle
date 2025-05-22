import React from "react";
import { Line } from "react-chartjs-2";
import "./PeakHoursGraph.css";

const PeakHoursGraph = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.hour),
    datasets: [
      {
        label: "Activity",
        data: data.map((item) => item.activity),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { title: { display: true, text: "Hour of Day" } },
      y: { title: { display: true, text: "Activity Count" } },
    },
  };

  return (
    <div className="peak-hours-graph card">
      <h2>Peak Activity Hours</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PeakHoursGraph;
