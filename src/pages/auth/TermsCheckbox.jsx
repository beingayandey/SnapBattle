import React from "react";

const TermsCheckbox = ({ register, errors, isLoading }) => {
  return (
    <div className="checkbox-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          {...register("terms")}
          className={`checkbox-input ${errors.terms ? "input-error" : ""}`}
          disabled={isLoading}
        />
        I agree to the{" "}
        <a href="/terms" className="terms-link">
          Terms and Conditions
        </a>
      </label>
      {errors.terms && <p className="error-message">{errors.terms.message}</p>}
    </div>
  );
};

export default TermsCheckbox;
