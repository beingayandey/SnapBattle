import React from "react";
import "./EventDeadlinePicker.css";

const EventDeadlinePicker = ({ start_date, end_date, onChange }) => {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (
      end_date &&
      newStartDate &&
      new Date(newStartDate) > new Date(end_date)
    ) {
      alert("Start date must be before the end date.");
    }
    onChange(e);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (
      start_date &&
      newEndDate &&
      new Date(newEndDate) < new Date(start_date)
    ) {
      alert("End date must be after the start date.");
    }
    onChange(e);
  };

  return (
    <div className="event-deadline-picker card">
      <h2 className="card-title">Event Dates</h2>
      <div className="form-group">
        <label htmlFor="start_date">Start Date & Time</label>
        <input
          type="datetime-local"
          id="start_date"
          name="start_date"
          value={start_date}
          onChange={handleStartDateChange}
          required
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="end_date">End Date & Time</label>
        <input
          type="datetime-local"
          id="end_date"
          name="end_date"
          value={end_date}
          onChange={handleEndDateChange}
          required
          min={start_date || new Date().toISOString().slice(0, 16)}
        />
      </div>
    </div>
  );
};

export default EventDeadlinePicker;
