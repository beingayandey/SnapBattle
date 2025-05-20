import React from "react";
import { useNavigate } from "react-router-dom";
import "./FormActionButtons.css";

const FormActionButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="form-actions">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="action-button action-button-cancel"
      >
        Cancel
      </button>
      <button type="submit" className="action-button action-button-save">
        Save Changes
      </button>
    </div>
  );
};

export default FormActionButtons;
