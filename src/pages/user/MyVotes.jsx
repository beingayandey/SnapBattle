import React, { useState } from "react";
import VotedEventGroup from "../../components/user/MyVotes/VotedEventGroup";
import VotesDateFilter from "../../components/user/MyVotes/VotesDateFilter";
import "./MyVotes.css";

// Mock data for voting history, showing only the submission the user voted on per event
const mockVotingHistory = Array.from({ length: 5 }, (_, i) => ({
  eventId: (i + 1).toString(),
  eventName: `Event ${i + 1}`,
  votes: [
    {
      submissionId: `${i + 1}01`,
      thumbnail: `https://picsum.photos/150?random=${i + 1}`,
      title: `Submission ${i + 1}`,
      voteCount: Math.floor(Math.random() * 100),
      voteDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
        .toISOString()
        .split("T")[0],
    },
  ],
}));

const MyVotes = () => {
  const [filteredHistory, setFilteredHistory] = useState(mockVotingHistory);

  const handleApplyFilter = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = mockVotingHistory
      .map((event) => {
        const filteredVotes = event.votes.filter((vote) => {
          const voteDate = new Date(vote.voteDate);
          return voteDate >= from && voteDate <= to;
        });
        return { ...event, votes: filteredVotes };
      })
      .filter((event) => event.votes.length > 0); // Only keep events with votes in the date range

    setFilteredHistory(filtered);
  };

  const handleClearFilter = () => {
    setFilteredHistory(mockVotingHistory);
  };

  return (
    <div className="my-votes-container">
      <h1 className="my-votes-title">My Voting History</h1>
      <VotesDateFilter
        onApplyFilter={handleApplyFilter}
        onClearFilter={handleClearFilter}
      />
      {filteredHistory.length === 0 ? (
        <p className="no-votes">No votes found in this date range.</p>
      ) : (
        <div className="d-flex flex-wrap gap-1 justify-content-center">
          {filteredHistory.map((event) => (
            <VotedEventGroup
              key={event.eventId}
              eventName={event.eventName}
              votes={event.votes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVotes;
