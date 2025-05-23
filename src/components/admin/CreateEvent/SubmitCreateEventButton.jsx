import React from "react";
import "./SubmitCreateEventButton.css";

const SubmitCreateEventButton = ({ isSubmitting, isButtonDisabled }) => {
  return (
    <button
      type="submit"
      className="submit-create-event-button"
      disabled={isButtonDisabled || isSubmitting}
    >
      {isSubmitting ? <span className="spinner"></span> : "Create Event"}
    </button>
  );
};

export default SubmitCreateEventButton;
