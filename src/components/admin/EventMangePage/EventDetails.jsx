import React, { useState } from "react";

const EventDetails = () => {
  const [eventData, setEventData] = useState({
    name: "Photo Contest 2025",
    description: "A contest for the best landscape photos.",
    rules: "Max 3 submissions per user, no digital alterations.",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // API call to save event details
    alert("Event details saved!");
  };

  return (
    <div className="card event-details">
      <h3>Event Details</h3>
      <div className="event-details__field">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
        />
      </div>
      <div className="event-details__field">
        <label>Description</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
        />
      </div>
      <div className="event-details__field">
        <label>Rules</label>
        <textarea
          name="rules"
          value={eventData.rules}
          onChange={handleChange}
        />
      </div>
      <button className="button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EventDetails;
