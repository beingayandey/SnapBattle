import React, { useState } from "react";
import "./PrivacyControls.css";

function PrivacyControls() {
  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
  });

  const handleToggle = (key) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="privacy-controls card">
      <h2>Privacy</h2>
      <div className="toggle-group">
        <label className="toggle-item">
          <span>Share Data with Third Parties</span>
          <input
            type="checkbox"
            checked={privacy.shareData}
            onChange={() => handleToggle("shareData")}
          />
        </label>
        <label className="toggle-item">
          <span>Enable Analytics</span>
          <input
            type="checkbox"
            checked={privacy.analytics}
            onChange={() => handleToggle("analytics")}
          />
        </label>
      </div>
    </section>
  );
}

export default PrivacyControls;
