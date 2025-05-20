import React from "react";
import "./UserActivityChart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FaUsers } from "react-icons/fa";

const UserActivityChart = () => {
  const data = [
    { date: "2025-05-14", users: 120 },
    { date: "2025-05-15", users: 150 },
    { date: "2025-05-16", users: 180 },
    { date: "2025-05-17", users: 200 },
    { date: "2025-05-18", users: 170 },
    { date: "2025-05-19", users: 190 },
    { date: "2025-05-20", users: 210 },
  ];

  return (
    <div className="report-box">
      <div className="report-header">
        <FaUsers size={24} />
        <h2>User Activity</h2>
      </div>
      <div className="chart-content">
        <LineChart width={300} height={200} data={data}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="var(--primary)" />
        </LineChart>
      </div>
    </div>
  );
};

export default UserActivityChart;
