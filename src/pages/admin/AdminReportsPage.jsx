import React from "react";
import "./AdminReportsPage.css";
import SubmissionStats from "../../components/admin/Report/SubmissionStats";
import UserActivityChart from "../../components/admin/Report/UserActivityChart";
import VotingStats from "../../components/admin/Report/VotingStats";
import PeakHoursGraph from "../../components/admin/Report/PeakHoursGraph";
import ExportReportPanel from "../../components/admin/Report/ExportReportPanel";
import { MdOutlineBarChart } from "react-icons/md";

const AdminReportsPage = () => {
  return (
    <>
      <div className="dashboard-header">
        <MdOutlineBarChart size={32} />
        <h1>Admin Reports Dashboard</h1>
      </div>
      <div className="reports-grid">
        <SubmissionStats />
        <UserActivityChart />
        <VotingStats />
        <PeakHoursGraph />
        <ExportReportPanel />
      </div>
    </>
  );
};

export default AdminReportsPage;
