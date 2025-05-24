import React from "react";

const VerificationCodeSection = ({
  code,
  setCode,
  error,
  handleVerifyCode,
  handleCancelVerification,
}) => (
  <form onSubmit={handleVerifyCode}>
    <div className="form-group">
      <label htmlFor="code">Verification Code</label>
      <input
        type="text"
        id="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="form-input"
        placeholder="Enter 6-digit code"
      />
    </div>
    {error && <p className="form-error">{error}</p>}
    <div className="form-actions">
      <button type="submit" className="form-button form-button-primary">
        Verify
      </button>
      <button
        type="button"
        className="form-button form-button-secondary"
        onClick={handleCancelVerification}
      >
        Cancel
      </button>
    </div>
  </form>
);

export default VerificationCodeSection;
