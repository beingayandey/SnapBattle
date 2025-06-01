import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventHeader from "../../components/user/UserEventDetails/EventHeader";
import SubmissionGallery from "../../components/user/UserEventDetails/SubmissionGallery";
import UploadSection from "../../components/user/UserEventDetails/UploadSection";
import "./UserEventDetails.css";

// Simulated event data
const mockEventData = {
  eventId: "123",
  name: "Photography Contest 2025",
  totalParticipants: 150,
  totalSubmissions: 320,
  submissions: Array.from({ length: 60 }, (_, i) => ({
    id: (i + 1).toString(),
    url: `https://picsum.photos/300/200?random=${i + 1}`,
    alt: `Submission ${i + 1}`,
  })),
};

const UserEventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    setEvent(mockEventData);
  }, [eventId]);

  if (!event) {
    return <div className="event-details-loading">Loading...</div>;
  }

  return (
    <div className="event-details-container">
      <EventHeader
        name={event.name}
        totalParticipants={event.totalParticipants}
        totalSubmissions={event.totalSubmissions}
      />
      <SubmissionGallery submissions={event.submissions} />
      <UploadSection eventId={eventId} />
    </div>
  );
};

export default UserEventDetails;
