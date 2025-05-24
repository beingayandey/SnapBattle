import React, { useState } from "react";
import "./LanguageSettings.css";

function LanguageSettings() {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <section className="language-settings card">
      <h2>Language</h2>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="language-select"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>
    </section>
  );
}

export default LanguageSettings;
