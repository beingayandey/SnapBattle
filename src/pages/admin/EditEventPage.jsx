import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditEventForm from "../../components/admin/AdminEvents/EditEventForm";
import "./EditEventPage.css";

const dummyEvent = {
  title: "Summer Hackathon 2025",
  description: "Join our annual coding competition to showcase your skills!",
  rules: "1. Teams of up to 4\n2. No external code\n3. Submit by deadline",
  startDateTime: "2025-06-15T09:00",
  endDateTime: "2025-06-16T17:00",
  submissionCap: 50,
  publicVoting: true,
  showInGallery: false,
};

const EditEventPage = () => {
  const navigate = useNavigate();

  const handleSave = (data) => {
    console.log("Saving event:", data);
    toast.success("Event updated successfully");
    navigate(-1);
  };

  return (
    <div className="edit-event-page">
      <div className="edit-event-container">
        <h1 className="edit-event-title">Edit Event</h1>
        <EditEventForm eventData={dummyEvent} onSave={handleSave} />
      </div>
    </div>
  );
};

export default EditEventPage;
