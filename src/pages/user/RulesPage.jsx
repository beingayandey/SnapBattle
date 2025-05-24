import React from "react";
import RuleSection from "./RuleSection";
import "./RulesPage.css";

const RulesPage = () => {
  return (
    <div className="rules-page">
      <header className="rules-header">
        <h1>Contest Rules</h1>
        <p className="rules-subtitle">
          Everything you need to know to participate in the contest
        </p>
      </header>
      <main className="rules-content">
        <RuleSection
          title="Submission Guidelines"
          rules={[
            "All entries must be submitted by 11:59 PM EST on the contest deadline.",
            "Submissions must be original work created by the participant.",
            "Files must be in specified formats: .jpg, .png, or .pdf (max 10MB).",
            "Each participant may submit up to 3 entries.",
            "Include a brief description (max 200 words) with each submission.",
          ]}
        />
        <RuleSection
          title="Voting Rules"
          rules={[
            "Voting is open to registered users only.",
            "Each user gets one vote per category, cast via the official platform.",
            "Votes must be submitted within the voting period (see timeline).",
            "No automated or bot voting is allowed; violators will be disqualified.",
          ]}
        />
        <RuleSection
          title="Winner Criteria"
          rules={[
            "Winners are determined by a combination of public votes (50%) and judge scores (50%).",
            "Judging criteria: creativity (40%), technical skill (30%), and adherence to theme (30%).",
            "Top 3 entries per category will be awarded.",
            "Winners will be notified via email within 48 hours of contest close.",
          ]}
        />
        <RuleSection
          title="Disqualification Conditions"
          rules={[
            "Plagiarized or non-original work will be disqualified.",
            "Submissions violating content guidelines (e.g., offensive material) are ineligible.",
            "Late submissions will not be accepted.",
            "Participants found manipulating votes will be disqualified.",
          ]}
        />
        <RuleSection
          title="Event Timelines"
          rules={[
            "Contest Announcement: January 15, 2026",
            "Submission Period: January 20, 2026 - February 20, 2026",
            "Voting Period: February 25, 2026 - March 5, 2026",
            "Winners Announced: March 10, 2026",
            "Awards Ceremony: March 15, 2026",
          ]}
        />
      </main>
    </div>
  );
};

export default RulesPage;
