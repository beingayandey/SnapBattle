import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Tooltip } from "react-tooltip";
import EventToggleOptions from "./EventToggleOptions";
import FormActionButtons from "./FormActionButtons";
import "./EditEventForm.css";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Event title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup.string().notRequired(),
  rules: yup.string().notRequired(),
  startDateTime: yup.string().required("Start date is required"),
  endDateTime: yup
    .string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      (value, context) =>
        new Date(value) > new Date(context.parent.startDateTime)
    ),
  submissionCap: yup
    .number()
    .min(1, "Submission cap must be at least 1")
    .notRequired(),
  publicVoting: yup.boolean().notRequired(),
  showInGallery: yup.boolean().notRequired(),
});

const EditEventForm = ({ eventData, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: eventData,
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-event-form">
      <div className="form-group">
        <label className="form-label">Event Title</label>
        <input
          type="text"
          {...register("title")}
          className="form-input"
          placeholder="Enter event title"
        />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          {...register("description")}
          className="form-textarea"
          rows="4"
          placeholder="Describe the event"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Rules</label>
        <textarea
          {...register("rules")}
          className="form-textarea"
          rows="4"
          placeholder="List event rules"
        />
      </div>

      <div className="form-group form-grid">
        <div>
          <label className="form-label">Start Date & Time</label>
          <input
            type="datetime-local"
            {...register("startDateTime")}
            className="form-input"
          />
          {errors.startDateTime && (
            <p className="form-error">{errors.startDateTime.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">End Date & Time</label>
          <input
            type="datetime-local"
            {...register("endDateTime")}
            className="form-input"
          />
          {errors.endDateTime && (
            <p className="form-error">{errors.endDateTime.message}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <div className="form-label-container">
          <label className="form-label">Submission Cap</label>
          <button
            type="button"
            className="info-button"
            data-tooltip-id="submission-cap-tooltip"
            data-tooltip-content="Submission Cap refers to the maximum number of  photos a user can submit to a specific event."
          >
            i
          </button>
          <Tooltip id="submission-cap-tooltip" clickable={true} place="top" />
        </div>
        <input
          type="number"
          {...register("submissionCap")}
          className="form-input"
          placeholder="Max submissions"
        />
        {errors.submissionCap && (
          <p className="form-error">{errors.submissionCap.message}</p>
        )}
      </div>

      <EventToggleOptions register={register} />
      <FormActionButtons />
    </form>
  );
};

export default EditEventForm;
