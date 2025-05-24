import React, { useState } from "react";
import EventSelect from "../../components/user/UploadPhoto/EventSelect";
import UploadRules from "../../components/user/UploadPhoto/UploadRules";
import UploadForm from "../../components/user/UploadPhoto/UploadForm";
import "./UploadPhoto.css";

const events = [
  { id: "e1", name: "Nature Contest", maxUploads: 3 },
  { id: "e2", name: "Urban Life", maxUploads: 2 },
];

const mockUserSubmissions = {
  e1: 1,
  e2: 0,
};

function UploadPhoto() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [uploads, setUploads] = useState([]);

  const handleEventSelect = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    setSelectedEvent(event);
    setUploads([]); // Reset uploads when event changes
  };

  return (
    <div className="upload-photo-container">
      <h1>Upload Your Photos</h1>
      <EventSelect events={events} onSelect={handleEventSelect} />
      {selectedEvent && (
        <>
          <UploadRules
            event={selectedEvent}
            userSubmissionCount={mockUserSubmissions[selectedEvent.id] || 0}
          />
          <UploadForm
            event={selectedEvent}
            userSubmissionCount={mockUserSubmissions[selectedEvent.id] || 0}
            uploads={uploads}
            setUploads={setUploads}
          />
        </>
      )}
    </div>
  );
}

export default UploadPhoto;
