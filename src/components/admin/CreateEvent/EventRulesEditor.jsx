import React from "react";
import "./EventRulesEditor.css";

const EventRulesEditor = ({ rules, onChange }) => {
  return (
    <div className="event-rules-editor card">
      <h2 className="card-title">Rules</h2>
      <div className="form-group">
        <label htmlFor="rules">Rules & Guidelines</label>
        <textarea
          id="rules"
          name="rules"
          value={rules}
          onChange={onChange}
          placeholder="Event rules and guidelines"
          rows="6"
        />
      </div>
    </div>
  );
};

export default EventRulesEditor;
