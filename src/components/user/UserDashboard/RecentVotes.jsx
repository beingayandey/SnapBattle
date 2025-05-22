import React from "react";
import "./RecentVotes.css";

// Mock data (replace with real data)
const votes = [
  {
    id: 1,
    contest: "Summer Snapshots",
    photo: "Photo #123",
    date: "2025-05-20",
  },
  { id: 2, contest: "City Lights", photo: "Photo #456", date: "2025-05-19" },
];

function RecentVotes() {
  return (
    <div className="recent-votes">
      <h2 className="votes-title">Recent Votes</h2>
      <ul className="votes-list">
        {votes.map((vote) => (
          <li key={vote.id} className="vote-item">
            <span className="vote-contest">{vote.contest}</span>
            <span className="vote-photo">{vote.photo}</span>
            <span className="vote-date">{vote.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentVotes;
