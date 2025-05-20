import React from "react";
import "./SubmissionStats.css";
import { FaCamera } from "react-icons/fa";

const SubmissionStats = () => {
  const stats = {
    totalSubmissions: 1250,
    events: [
      { name: "Summer Contest", count: 500 },
      { name: "Winter Snap", count: 350 },
      { name: "Spring Click", count: 400 },
    ],
  };

  return (
    <div className="report-box">
      <div className="report-header">
        <FaCamera size={24} />
        <h2>Submission Stats</h2>
      </div>
      <div className="stats-content">
        <div className="stat-tile">
          <h3>Total Submissions</h3>
          <p>{stats.totalSubmissions}</p>
        </div>
        <div className="event-breakdown">
          <h3>By Event</h3>
          {stats.events.map((event, index) => (
            <div key={index} className="event-stat">
              <span>{event.name}</span>
              <span>{event.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionStats;
