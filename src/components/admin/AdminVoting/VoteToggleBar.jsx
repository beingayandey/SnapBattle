import React from "react";
import "./VoteToggleBar.css";

function VoteToggleBar({ isVotingEnabled, setIsVotingEnabled }) {
  return (
    <div className="vote-toggle-bar">
      <span className="toggle-status">
        Voting: {isVotingEnabled ? "Enabled" : "Disabled"}
      </span>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isVotingEnabled}
          onChange={() => setIsVotingEnabled(!isVotingEnabled)}
        />
        <span className="toggle-slider" />
      </label>
    </div>
  );
}

export default VoteToggleBar;
