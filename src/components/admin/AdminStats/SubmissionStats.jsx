import React from "react";
import { Pie } from "react-chartjs-2";
import "./SubmissionStats.css";

const SubmissionStats = ({ data }) => {
  const chartData = {
    labels: ["Accepted", "Rejected"],
    datasets: [
      {
        data: [data.accepted, data.rejected],
        backgroundColor: ["#10b981", "#ef4444"],
        borderColor: ["#059669", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  return (
    <div className="submission-stats card">
      <h2>Submission Status</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default SubmissionStats;
