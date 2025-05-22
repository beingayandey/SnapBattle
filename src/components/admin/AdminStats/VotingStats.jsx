import React from "react";
import { Bar } from "react-chartjs-2";
import "./VotingStats.css";

const VotingStats = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.submissionId),
    datasets: [
      {
        label: "Votes",
        data: data.map((item) => item.votes),
        backgroundColor: "#3b82f6",
        borderColor: "#2563eb",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { title: { display: true, text: "Submission" } },
      y: { title: { display: true, text: "Votes" } },
    },
  };

  return (
    <div className="voting-stats card">
      <h2>Votes per Submission</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default VotingStats;
