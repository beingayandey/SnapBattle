import React, { useEffect, useState } from "react";
import EventSelect from "../../components/user/UploadPhoto/EventSelect";
import UploadRules from "../../components/user/UploadPhoto/UploadRules";
import UploadForm from "../../components/user/UploadPhoto/UploadForm";
import "./UploadPhoto.css";
import { getUserEvents } from "../../api/api";

const events = [
  { id: "e1", name: "Nature Contest", maxUploads: 3 },
  { id: "e2", name: "Urban Life", maxUploads: 2 },
];

const mockUserSubmissions = {
  e1: 1,
  e2: 0,
};

const UploadPhoto = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [uploads, setUploads] = useState([]);
  const token = sessionStorage.getItem("token");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserEvents = async () => {
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getUserEvents({ token });
      setEvents(response.data.events || []); // Adjust based on your API response structure
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch events. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, []);

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
};

export default UploadPhoto;
