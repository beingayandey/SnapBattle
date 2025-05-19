import React from "react";
import "./SubmitCreateEventButton.css";

const SubmitCreateEventButton = ({ isSubmitting, disabled }) => {
  return (
    <button
      type="submit"
      className="submit-create-event-button"
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? <span className="spinner"></span> : "Create Event"}
    </button>
  );
};

export default SubmitCreateEventButton;
