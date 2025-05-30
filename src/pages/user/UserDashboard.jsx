import React, { useState, useEffect } from "react";
import EventCard from "../../components/user/UserDashboard/EventCard";
import SubmissionSummary from "../../components/user/UserDashboard/SubmissionSummary";
import RecentVotes from "../../components/user/UserDashboard/RecentVotes";
import UserNotifications from "../../components/user/UserDashboard/UserNotifications";
import { getUserEvents } from "../../api/api";
import "./UserDashboard.css";
import withPhoneVerification from "../auth/withPhoneVerification";

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const fetchUserEvents = async () => {
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getUserEvents({ token });
      setEvents(response.data.events || []); // Adjust based on your API response structure
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch events. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Dashboard</h1>
      <section className="events-section">
        <h2 className="section-title">Active Photo Contests</h2>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="no-events-message">No active photo contests found.</p>
        )}
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

export default withPhoneVerification(UserDashboard);
