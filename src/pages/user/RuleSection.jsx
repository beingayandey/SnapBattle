import React from "react";
import "./RuleSection.css";

const RuleSection = ({ title, rules }) => {
  return (
    <section className="rule-section">
      <h2 className="rule-title">{title}</h2>
      <ul className="rule-list">
        {rules.map((rule, index) => (
          <li key={index} className="rule-item">
            {rule}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RuleSection;
