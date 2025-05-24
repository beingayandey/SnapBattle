import React from "react";
import VotedSubmissionCard from "./VotedSubmissionCard";
import "./VotedEventGroup.css";

const VotedEventGroup = ({ eventName, votes }) => {
  return (
    <>
      <div className="voted-event-group">
        <h2 className="event-name">{eventName}</h2>
        <div className="submissions-grid">
          {votes.map((vote) => (
            <VotedSubmissionCard
              key={vote.submissionId}
              thumbnail={vote.thumbnail}
              title={vote.title}
              voteCount={vote.voteCount}
              voteDate={vote.voteDate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default VotedEventGroup;
