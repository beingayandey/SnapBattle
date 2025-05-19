import React, { useState } from "react";
import EventBasicInfo from "../../components/admin/createEvent/EventBasicInfo";
import EventRulesEditor from "../../components/admin/createEvent/EventRulesEditor";
import EventImageUploader from "../../components/admin/createEvent/EventImageUploader";
import EventDeadlinePicker from "../../components/admin/createEvent/EventDeadlinePicker";
import EventVisibilityOptions from "../../components/admin/createEvent/EventVisibilityOptions";
import SubmitCreateEventButton from "../../components/admin/createEvent/SubmitCreateEventButton";
import "./CreateEventPage.css";

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    rules: "",
    image: null,
    deadline: "",
    visibility: "public",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-event-page">
      <h1 className="page-title">Create New Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-grid">
          <div className="form-column">
            <EventBasicInfo
              title={formData.title}
              subtitle={formData.subtitle}
              category={formData.category}
              onChange={handleInputChange}
            />
            <EventRulesEditor
              rules={formData.rules}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <EventImageUploader
              image={formData.image}
              onImageChange={handleImageChange}
            />
            <EventDeadlinePicker
              deadline={formData.deadline}
              onChange={handleInputChange}
            />
            <EventVisibilityOptions
              visibility={formData.visibility}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submit-button-container">
          <SubmitCreateEventButton
            isSubmitting={isSubmitting}
            disabled={!formData.title || !formData.deadline}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
