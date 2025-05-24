import React from "react";
import EventGrid from "../../components/user/UserVote/EventGrid";
import "./VotePage.css";

// Mock data for events and submissions
const mockEvents = [
  { id: 1, name: "Spring Art Contest", active: true },
  { id: 2, name: "Summer Photo Challenge", active: true },
  { id: 3, name: "Winter Sketch Fest", active: false },
];

const mockSubmissions = [
  {
    eventId: 1,
    submissions: [
      {
        id: 101,
        title: "Sunset Glow",
        imageUrl: "https://picsum.photos/300/200?random=101",
        votes: 12,
      },
      {
        id: 102,
        title: "Mountain Bliss",
        imageUrl: "https://picsum.photos/300/250?random=102",
        votes: 8,
      },
      {
        id: 103,
        title: "Ocean Waves",
        imageUrl: "https://picsum.photos/300/220?random=103",
        votes: 15,
      },
    ],
  },
  {
    eventId: 2,
    submissions: [
      {
        id: 201,
        title: "City Lights",
        imageUrl: "https://picsum.photos/300/230?random=201",
        votes: 10,
      },
      {
        id: 202,
        title: "Forest Path",
        imageUrl: "https://picsum.photos/300/200?random=202",
        votes: 5,
      },
    ],
  },
];

const VotePage = () => {
  const activeEvents = mockEvents.filter((event) => event.active);

  return (
    <div className="vote-page">
      <header className="vote-page-header">
        <h1 className="vote-page-title">Vote for Your Favorite Event</h1>
      </header>
      <EventGrid events={activeEvents} submissions={mockSubmissions} />
    </div>
  );
};

export default VotePage;
