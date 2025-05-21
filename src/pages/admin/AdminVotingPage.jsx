import React, { useState } from "react";
import "./AdminVotingPage.css";
import VotingEventList from "../../components/admin/AdminVoting/VotingEventList";
import VoteCard from "../../components/admin/AdminVoting/VoteCard";
import VoteToggleBar from "../../components/admin/AdminVoting/VoteToggleBar";
import VotingStats from "../../components/admin/AdminVoting/VotingStats";
import WinnerPanel from "../../components/admin/AdminVoting/WinnerPanel";
import ExportVotingData from "../../components/admin/AdminVoting/ExportVotingData";

// Sample data
const events = [
  { id: 1, name: "Event 1" },
  { id: 2, name: "Event 2" },
  { id: 3, name: "Event 3" },
  { id: 4, name: "Event 4" },
  { id: 5, name: "Event 5" },
  { id: 6, name: "Event 6" },
];

const submissions = [
  {
    id: 1,
    title: "Submission 1",
    image: "https://picsum.photos/150?random=1",
    votes: 10,
  },
  {
    id: 2,
    title: "Submission 2",
    image: "https://picsum.photos/150?random=2",
    votes: 15,
  },
  {
    id: 3,
    title: "Submission 3",
    image: "https://picsum.photos/150?random=3",
    votes: 8,
  },
  {
    id: 4,
    title: "Submission 4",
    image: "https://picsum.photos/150?random=4",
    votes: 12,
  },
  {
    id: 5,
    title: "Submission 5",
    image: "https://picsum.photos/150?random=5",
    votes: 18,
  },
  {
    id: 6,
    title: "Submission 6",
    image: "https://picsum.photos/150?random=6",
    votes: 5,
  },
];

function AdminVotingPage() {
  const [selectedEvent, setSelectedEvent] = useState(events[0]?.id);
  const [isVotingEnabled, setIsVotingEnabled] = useState(true);

  const handleEventSelect = (eventId) => {
    setSelectedEvent(eventId);
    alert(`Selected event: ${events.find((e) => e.id === eventId)?.name}`);
  };

  const handleVote = (submissionId) => {
    if (isVotingEnabled) {
      alert(`Voted for submission ${submissionId}`);
    } else {
      alert("Voting is disabled");
    }
  };

  const handleSelectWinner = (submissionId) => {
    alert(
      `Selected winner: ${
        submissions.find((s) => s.id === submissionId)?.title
      }`
    );
  };

  const handleExport = () => {
    alert("Exporting voting data...");
  };

  return (
    <div className="voting-page">
      <header className="voting-header">
        <h1>Voting Dashboard</h1>
        <VoteToggleBar
          isVotingEnabled={isVotingEnabled}
          setIsVotingEnabled={setIsVotingEnabled}
        />
      </header>
      <div className="voting-content">
        <aside className="voting-sidebar">
          <VotingEventList
            events={events}
            selectedEvent={selectedEvent}
            onEventSelect={handleEventSelect}
          />
        </aside>
        <main className="voting-main">
          <section className="voting-cards">
            {submissions.map((submission) => (
              <VoteCard
                key={submission.id}
                submission={submission}
                onVote={() => handleVote(submission.id)}
                isVotingEnabled={isVotingEnabled}
              />
            ))}
          </section>
          <section className="voting-stats">
            <VotingStats submissions={submissions} />
          </section>
        </main>
        <aside className="voting-winner-panel">
          <WinnerPanel
            submissions={submissions}
            onSelectWinner={handleSelectWinner}
          />
          <ExportVotingData onExport={handleExport} />
        </aside>
      </div>
    </div>
  );
}

export default AdminVotingPage;
