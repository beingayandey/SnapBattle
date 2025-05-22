import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import jsPDF from "jspdf";
import "./AdminStatsPage.css";
import SubmissionStats from "../../components/admin/AdminStats/SubmissionStats";
import UserActivityChart from "../../components/admin/AdminStats/UserActivityChart";
import VotingStats from "../../components/admin/AdminStats/VotingStats";
import PeakHoursGraph from "../../components/admin/AdminStats/PeakHoursGraph";
import ExportReportPanel from "../../components/admin/AdminStats/ExportReportPanel";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

const AdminStatsPage = () => {
  const [statsData, setStatsData] = useState({
    submissions: { accepted: 120, rejected: 30 },
    userActivity: [
      { date: "2025-05-15", logins: 100, votes: 50, submissions: 20 },
      { date: "2025-05-16", logins: 120, votes: 60, submissions: 25 },
      { date: "2025-05-17", logins: 90, votes: 40, submissions: 15 },
      { date: "2025-05-18", logins: 110, votes: 55, submissions: 22 },
      { date: "2025-05-19", logins: 130, votes: 70, submissions: 30 },
    ],
    votes: [
      { submissionId: "Photo 1", votes: 45 },
      { submissionId: "Photo 2", votes: 30 },
      { submissionId: "Photo 3", votes: 60 },
      { submissionId: "Photo 4", votes: 25 },
    ],
    peakHours: [
      { hour: "00:00", activity: 10 },
      { hour: "06:00", activity: 50 },
      { hour: "12:00", activity: 120 },
      { hour: "18:00", activity: 80 },
    ],
  });

  // State to track which component is zoomed
  const [zoomedComponent, setZoomedComponent] = useState(null);

  // Function to handle clicking a component to zoom
  const handleZoom = (componentName) => {
    setZoomedComponent(componentName);
  };

  // Function to exit zoomed view
  const handleExitZoom = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the card-wrapper
    setZoomedComponent(null);
  };

  // Export function for CSV and PDF
  const exportReport = (format) => {
    if (format === "csv") {
      const csvContent = [
        "Submissions,Accepted,Rejected",
        `,${statsData.submissions.accepted},${statsData.submissions.rejected}`,
        "User Activity,Date,Logins,Votes,Submissions",
        ...statsData.userActivity.map(
          (item) =>
            `${item.date},${item.logins},${item.votes},${item.submissions}`
        ),
        "Votes,Submission ID,Votes",
        ...statsData.votes.map((item) => `${item.submissionId},${item.votes}`),
        "Peak Hours,Hour,Activity",
        ...statsData.peakHours.map((item) => `${item.hour},${item.activity}`),
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "admin_stats_report.csv";
      link.click();
    } else if (format === "pdf") {
      const doc = new jsPDF();
      doc.text("Admin Stats Report", 20, 20);
      doc.text(
        `Submissions - Accepted: ${statsData.submissions.accepted}, Rejected: ${statsData.submissions.rejected}`,
        20,
        30
      );
      doc.text("User Activity:", 20, 40);
      statsData.userActivity.forEach((item, index) => {
        doc.text(
          `${item.date}: Logins=${item.logins}, Votes=${item.votes}, Submissions=${item.submissions}`,
          20,
          50 + index * 10
        );
      });
      doc.text("Votes:", 20, 50 + statsData.userActivity.length * 10 + 10);
      statsData.votes.forEach((item, index) => {
        doc.text(
          `${item.submissionId}: ${item.votes}`,
          20,
          60 + statsData.userActivity.length * 10 + index * 10
        );
      });
      doc.save("admin_stats_report.pdf");
    }
  };

  return (
    <div className="admin-stats-page">
      <h1>Photo Contest Admin Dashboard</h1>
      <div className={`stats-grid ${zoomedComponent ? "zoomed" : ""}`}>
        <div
          className={`card-wrapper ${
            zoomedComponent === "submission" ? "zoomed-card" : ""
          } ${
            zoomedComponent && zoomedComponent !== "submission" ? "hidden" : ""
          }`}
          onClick={() => handleZoom("submission")}
        >
          {zoomedComponent === "submission" && (
            <button className="close-zoom-btn" onClick={handleExitZoom}>
              Close
            </button>
          )}
          <SubmissionStats data={statsData.submissions} />
        </div>

        <div
          className={`card-wrapper ${
            zoomedComponent === "userActivity" ? "zoomed-card" : ""
          } ${
            zoomedComponent && zoomedComponent !== "userActivity"
              ? "hidden"
              : ""
          }`}
          onClick={() => handleZoom("userActivity")}
        >
          {zoomedComponent === "userActivity" && (
            <button className="close-zoom-btn" onClick={handleExitZoom}>
              Close
            </button>
          )}
          <UserActivityChart data={statsData.userActivity} />
        </div>

        <div
          className={`card-wrapper ${
            zoomedComponent === "voting" ? "zoomed-card" : ""
          } ${zoomedComponent && zoomedComponent !== "voting" ? "hidden" : ""}`}
          onClick={() => handleZoom("voting")}
        >
          {zoomedComponent === "voting" && (
            <button className="close-zoom-btn" onClick={handleExitZoom}>
              Close
            </button>
          )}
          <VotingStats data={statsData.votes} />
        </div>

        <div
          className={`card-wrapper ${
            zoomedComponent === "peakHours" ? "zoomed-card" : ""
          } ${
            zoomedComponent && zoomedComponent !== "peakHours" ? "hidden" : ""
          }`}
          onClick={() => handleZoom("peakHours")}
        >
          {zoomedComponent === "peakHours" && (
            <button className="close-zoom-btn" onClick={handleExitZoom}>
              Close
            </button>
          )}
          <PeakHoursGraph data={statsData.peakHours} />
        </div>

        {/* Remove zoom functionality for ExportReportPanel */}
        <div className="card-wrapper">
          <ExportReportPanel onExport={exportReport} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsPage;
