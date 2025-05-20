import React from "react";
import "./PeakHoursGraph.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FaClock } from "react-icons/fa";

const PeakHoursGraph = () => {
  const data = [
    { hour: "00:00", submissions: 20, votes: 30 },
    { hour: "06:00", submissions: 50, votes: 60 },
    { hour: "12:00", submissions: 80, votes: 100 },
    { hour: "18:00", submissions: 70, votes: 90 },
  ];

  return (
    <div className="report-box">
      <div className="report-header">
        <FaClock size={24} />
        <h2>Peak Hours</h2>
      </div>
      <div className="chart-content">
        <BarChart width={300} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="submissions" stackId="a" fill="var(--primary)" />
          <Bar dataKey="votes" stackId="a" fill="var(--success)" />
        </BarChart>
      </div>
    </div>
  );
};

export default PeakHoursGraph;
