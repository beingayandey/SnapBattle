import React from "react";
import "./EventVisibilityOptions.css";

const EventVisibilityOptions = ({ visibility, onChange }) => {
  return (
    <div className="event-visibility-options card">
      <h2 className="card-title">Visibility</h2>
      <div className="visibility-toggle">
        <label className="toggle-option">
          <input
            type="radio"
            name="visibility"
            value="public"
            checked={visibility === "public"}
            onChange={onChange}
          />
          <span className="toggle-label">Public</span>
        </label>
        <label className="toggle-option">
          <input
            type="radio"
            name="visibility"
            value="private"
            checked={visibility === "private"}
            onChange={onChange}
          />
          <span className="toggle-label">Private</span>
        </label>
      </div>
    </div>
  );
};

export default EventVisibilityOptions;
