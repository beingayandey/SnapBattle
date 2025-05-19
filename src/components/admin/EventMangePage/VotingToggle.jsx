import React from "react";
import "./VotingToggle.css";

const VotingToggle = ({ votingEnabled, setVotingEnabled }) => {
  return (
    <div className="card">
      <label className="voting-toggle">
        Enable Public Voting
        <input
          type="checkbox"
          checked={votingEnabled}
          onChange={() => setVotingEnabled(!votingEnabled)}
        />
      </label>
    </div>
  );
};

export default VotingToggle;
