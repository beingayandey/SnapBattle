import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormField,
  resetForm,
} from "../../redux/slices/createEventSlices";
import { createEvent } from "../../api/api";
import EventBasicInfo from "../../components/admin/CreateEvent/EventBasicInfo";
import EventRulesEditor from "../../components/admin/CreateEvent/EventRulesEditor";
import EventImageUploader from "../../components/admin/CreateEvent/EventImageUploader";
import EventDeadlinePicker from "../../components/admin/CreateEvent/EventDeadlinePicker";
import EventVisibilityOptions from "../../components/admin/CreateEvent/EventVisibilityOptions";
import SubmitCreateEventButton from "../../components/admin/CreateEvent/SubmitCreateEventButton";
import "./CreateEventPage.css";
import { useToast } from "../../components/toast/ToastNotification";

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const { formData = {} } = useSelector(
    (state) => state.createEvent || { formData: {} }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const { showSuccess, showError, showInfo } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "visibility") {
      finalValue = value === "public";
    } else if (name === "upload_limit" || name === "upload_size") {
      finalValue = parseInt(value, 10) || 0; // Ensure numeric value
    }

    console.log("Input Change:", { name, value: finalValue });
    dispatch(updateFormField({ name, value: finalValue }));
  };

  const handleImageChange = (file) => {
    console.log("Image Change:", file);
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered at", new Date().toISOString());
    setIsSubmitting(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Missing token. Please log in.");
      console.log("formData:", formData);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title || "");
      formDataToSend.append("subtitle", formData.description || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("category", formData.category || "");
      formDataToSend.append("rules", formData.rules || "");
      if (image) {
        formDataToSend.append("banner", image);
      }
      formDataToSend.append(
        "start_date",
        new Date(formData.start_date).toISOString()
      );
      formDataToSend.append(
        "end_date",
        new Date(formData.end_date).toISOString()
      );
      formDataToSend.append("visibility", formData.visibility);
      formDataToSend.append("upload_limit", formData.upload_limit || 0);
      formDataToSend.append("upload_size", formData.upload_size || 0);

      console.log("FormData entries:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      console.log("Calling createEvent...");
      await createEvent(formDataToSend, token);
      showSuccess("Event created successfully");

      dispatch(resetForm());
      setImage(null);
    } catch (error) {
      console.error("Submission error:", error);
      showError(error.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled =
    !formData.title?.trim() ||
    !formData.description?.trim() ||
    !formData.category ||
    !formData.start_date ||
    !formData.end_date ||
    formData.upload_limit === undefined ||
    formData.upload_size === undefined;

  const visibilityForUI = formData.visibility ? "public" : "private";

  return (
    <div className="create-event-page">
      <h1 className="page-title">Create New Event</h1>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-grid">
          <div className="form-column">
            <EventBasicInfo
              title={formData.title || ""}
              subtitle={formData.description || ""}
              category={formData.category || ""}
              onChange={handleInputChange}
            />
            <EventRulesEditor
              rules={formData.rules || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-column">
            <EventImageUploader
              image={image}
              onImageChange={handleImageChange}
            />
            <EventDeadlinePicker
              start_date={formData.start_date}
              end_date={formData.end_date}
              onChange={handleInputChange}
            />
            <EventVisibilityOptions
              visibility={visibilityForUI}
              onChange={handleInputChange}
            />
            <div className="form-group">
              <label htmlFor="upload_limit">Upload Limit</label>
              <input
                type="number"
                id="upload_limit"
                name="upload_limit"
                value={formData.upload_limit || ""}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="upload_size">Upload Size (in KB)</label>
              <input
                type="number"
                id="upload_size"
                name="upload_size"
                value={formData.upload_size || ""}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>
        </div>
        <div className="submit-button-container">
          <SubmitCreateEventButton
            isSubmitting={isSubmitting}
            isButtonDisabled={isButtonDisabled}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
