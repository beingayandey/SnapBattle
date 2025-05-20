import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

const ActiveEvents = ({ theme = "light" }) => {
  const navigate = useNavigate();

  const events = [
    {
      id: "1",
      title: "Summer Snap 2025",
      deadline: "2025-06-15",
      submissions: 150,
      status: "Active",
    },
    {
      id: "2",
      title: "Winter Frames",
      deadline: "2025-01-10",
      submissions: 80,
      status: "Active",
    },
    {
      id: "3",
      title: "City Lights",
      deadline: "2025-03-20",
      submissions: 200,
      status: "Ended",
    },
  ];

  const handleManageClick = (eventId) => {
    navigate(`/admin/events/${eventId}/manage`);
  };

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
              <tr key={event.id}>
                <td data-label="Event Title">{event.title}</td>
                <td data-label=" Deadline">{event.deadline}</td>
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
                    onClick={() => handleManageClick(event.id)}
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
          <div key={event.id} className="event-card">
            <p>
              <strong>Title:</strong> {event.title}
            </p>
            <p>
              <strong>Deadline:</strong> {event.deadline}
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
              onClick={() => handleManageClick(event.id)}
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
