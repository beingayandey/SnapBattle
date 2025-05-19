import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const EventStats = () => {
  const statsData = [
    { name: "Submissions", value: 120 },
    { name: "Votes", value: 450 },
    { name: "Views", value: 2300 },
  ];

  return (
    <div className="card">
      <h3>Event Stats</h3>
      <BarChart width={500} height={200} data={statsData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="var(--primary)" />
      </BarChart>
    </div>
  );
};

export default EventStats;
