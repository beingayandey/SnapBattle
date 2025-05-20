import React from "react";
import "./VotingStats.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FaVoteYea } from "react-icons/fa";

const VotingStats = () => {
  const data = [
    { name: "Summer Contest", votes: 600 },
    { name: "Winter Snap", votes: 400 },
    { name: "Spring Click", votes: 300 },
  ];
  const COLORS = ["var(--primary)", "var(--success)", "var(--warning)"];

  return (
    <div className="report-box">
      <div className="report-header">
        <FaVoteYea size={24} />
        <h2>Voting Stats</h2>
      </div>
      <div className="chart-content">
        <PieChart width={300} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={COLORS[0]}
            dataKey="votes"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default VotingStats;
