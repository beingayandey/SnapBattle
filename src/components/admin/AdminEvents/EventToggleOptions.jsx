import React from "react";
import "./EventToggleOptions.css";

const EventToggleOptions = ({ register }) => {
  return (
    <div className="toggle-options">
      <div className="toggle-group">
        <input
          type="checkbox"
          {...register("publicVoting")}
          className="toggle-checkbox"
          id="publicVoting"
        />
        <label htmlFor="publicVoting" className="toggle-label">
          Enable Public Voting
        </label>
      </div>
      <div className="toggle-group">
        <input
          type="checkbox"
          {...register("showInGallery")}
          className="toggle-checkbox"
          id="showInGallery"
        />
        <label htmlFor="showInGallery" className="toggle-label">
          Show in Public Gallery
        </label>
      </div>
    </div>
  );
};

export default EventToggleOptions;
