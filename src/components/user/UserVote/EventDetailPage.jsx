import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetailPage.css";

// Mock data for events and submissions (repeated for context)
const mockEvents = [
  { id: 1, name: "Spring Art Contest", active: true },
  { id: 2, name: "Summer Photo Challenge", active: true },
  { id: 3, name: "Winter Sketch Fest", active: false },
];

const mockSubmissions = mockEvents.map((event) => ({
  eventId: event.id,
  submissions: Array.from(
    { length: Math.floor(Math.random() * 15) + 1 },
    (_, i) => ({
      id: event.id * 100 + i + 1,
      title: `Submission ${i + 1}`,
      imageUrl: `https://picsum.photos/300/200?random=${
        event.id * 100 + i + 1
      }`,
      votes: Math.floor(Math.random() * 20),
    })
  ),
}));

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [votedSubmission, setVotedSubmission] = useState(null);

  const event = mockEvents.find((e) => e.id === Number(eventId));
  const submissions =
    mockSubmissions.find((sub) => sub.eventId === Number(eventId))
      ?.submissions || [];

  const handleVote = (submissionId) => {
    setVotedSubmission(submissionId);
  };

  if (!event) {
    return <div className="event-detail-page">Event not found.</div>;
  }

  return (
    <div className="event-detail-page">
      <header className="event-detail-header">
        <h1 className="event-detail-title">{event.name}</h1>
      </header>
      {submissions.length > 0 ? (
        <div className="submission-grid">
          {submissions.map((submission) => (
            <div key={submission.id} className="submission-card">
              <img
                src={submission.imageUrl}
                alt={submission.title}
                className="submission-image"
              />
              <h3 className="submission-title">{submission.title}</h3>
              <button
                className="vote-button"
                onClick={() => handleVote(submission.id)}
                disabled={votedSubmission !== null}
              >
                {votedSubmission === submission.id
                  ? "Voted"
                  : votedSubmission !== null
                  ? "Vote Disabled"
                  : "Vote"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-submissions">
          No submissions available for this event.
        </p>
      )}
    </div>
  );
};

export default EventDetailPage;
