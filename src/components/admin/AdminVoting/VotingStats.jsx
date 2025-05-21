import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./VotingStats.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VotingStats({ submissions }) {
  const data = {
    labels: submissions.map((s) => s.title),
    datasets: [
      {
        label: "Votes",
        data: submissions.map((s) => s.votes),
        backgroundColor: "var(--primary)",
        borderColor: "var(--primary)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Voting Statistics",
        color: "var(--text-main)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "var(--text-main)" },
        grid: { color: "var(--border)" },
      },
      x: {
        ticks: { color: "var(--text-main)" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="voting-stats">
      <Bar data={data} options={options} />
    </div>
  );
}

export default VotingStats;
