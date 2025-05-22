import React from "react";
import "./VoteCard.css";
import Fancybox from "../../common/Fancybox"; // Import the Fancybox wrapper

function VoteCard({ submission, onVote, isVotingEnabled }) {
  return (
    <div className="vote-card">
      <div className="vote-card-image">
        <Fancybox
          options={{
            Toolbar: {
              display: {
                left: ["zoomIn", "zoomOut"],
                right: ["close"],
              },
            },
          }}
        >
          <a
            href={submission.image}
            data-fancybox="submission"
            data-caption={`Votes: ${submission.votes} ` || "Submission Image"}
          >
            <img src={submission.image} alt={submission.title} />
          </a>
        </Fancybox>
        {/* <div className="vote-card-overlay" /> */}
      </div>
      <div className="vote-card-content">
        <h3>{submission.title}</h3>
        <p>Votes: {submission.votes}</p>
      </div>
    </div>
  );
}

export default VoteCard;
