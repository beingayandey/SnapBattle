import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { getEventList } from "../../api/api";

const ActiveEvents = ({ theme = "light" }) => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const token = sessionStorage.getItem("token");

  const fetchEvents = async (page = 1, status = "Active", limitPerPage = 3) => {
    try {
      const response = await getEventList({
        token,
        page,
        status,
        limit: limitPerPage,
      });
      setEvents(response.data.docs);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleManageClick = (eventId) => {
    navigate(`/admin/events/${eventId}/manage`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div
      className={clsx("active-events-container", theme === "dark" && "dark")}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="active-events-title">Active Events </h2>
        <Link to="/admin/events" className="see-all-events-btn">
          See All Events
        </Link>
      </div>
      <div className="table-wrapper">
        <table className="active-events-table">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Deadline</th>
              <th>Submissions</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td data-label="Event Title">{event.description}</td>
                <td data-label="Deadline">
                  {new Date(event.end_date).toLocaleString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
                <td data-label="Submissions">{event.submissions}</td>
                <td data-label="Status">
                  <span
                    className={clsx("status-badge", event.status.toLowerCase())}
                  >
                    {event.status}
                  </span>
                </td>
                <td data-label="Action">
                  <button
                    className="manage-button"
                    onClick={() => handleManageClick(event._id)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-view">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <p>
              <strong>Title:</strong> {event.description}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(event.end_date).toLocaleString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
              })}
            </p>
            <p>
              <strong>Submissions:</strong> {event.submissions}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={clsx("status-badge", event.status.toLowerCase())}
              >
                {event.status}
              </span>
            </p>
            <button
              className="manage-button"
              onClick={() => handleManageClick(event._id)}
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveEvents;
