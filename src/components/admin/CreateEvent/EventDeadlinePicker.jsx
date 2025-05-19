import React from "react";
import "./EventDeadlinePicker.css";

const EventDeadlinePicker = ({ deadline, onChange }) => {
  return (
    <div className="event-deadline-picker card">
      <h2 className="card-title">Deadline</h2>
      <div className="form-group">
        <label htmlFor="deadline">End Date & Time</label>
        <input
          type="datetime-local"
          id="deadline"
          name="deadline"
          value={deadline}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default EventDeadlinePicker;
