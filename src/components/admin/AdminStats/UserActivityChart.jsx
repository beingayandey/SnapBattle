import React from "react";
import { Line } from "react-chartjs-2";
import "./UserActivityChart.css";

const UserActivityChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Logins",
        data: data.map((item) => item.logins),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
      {
        label: "Votes",
        data: data.map((item) => item.votes),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
      {
        label: "Submissions",
        data: data.map((item) => item.submissions),
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to stretch without maintaining aspect ratio
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 12,
          },
          padding: 10,
          callback: function (value, index) {
            return index % 2 === 0 ? this.getLabelForValue(value) : "";
          },
        },
      },
      y: {
        title: { display: true, text: "Count" },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    layout: {
      padding: {
        bottom: 20,
      },
    },
  };

  return (
    <div className="user-activity-chart card">
      <h2>User Activity Over Time</h2>
      <div style={{ height: "400px", width: "100%" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UserActivityChart;
