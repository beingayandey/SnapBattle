import React, { useState } from "react";
import EventCard from "../../components/user/UserDashboard/EventCard";
import SubmissionSummary from "../../components/user/UserDashboard/SubmissionSummary";
import RecentVotes from "../../components/user/UserDashboard/RecentVotes";
import UserNotifications from "../../components/user/UserDashboard/UserNotifications";
import { getUserEvents } from "../../api/api";
import "./UserDashboard.css";

// Mock data for events (replace with real data from API)
// const events = [
//   {
//     id: 1,
//     title: "Summer Snapshots",
//     image: "https://picsum.photos/300?random=1",
//     endDate: "2025-06-30",
//   },
//   {
//     id: 2,
//     title: "Winter Wonders",
//     image: "https://picsum.photos/300?random=2",
//     endDate: "2025-12-31",
//   },
//   {
//     id: 3,
//     title: "City Lights",
//     image: "https://picsum.photos/300?random=3",
//     endDate: "2025-09-15",
//   },
// ];

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const token = sessionStorage.getItem("token");
  const fetchUserEvents = async () => {
    const response = await getUserEvents({ token });
  };
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Dashboard</h1>
      <section className="events-section">
        <h2 className="section-title">Active Photo Contests</h2>
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      <div className="stats-notifications">
        <SubmissionSummary />
        <div className="votes-notifications">
          <RecentVotes />
          <UserNotifications />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
