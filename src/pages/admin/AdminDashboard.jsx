import React from "react";
import StatsCards from "../../components/admin/StatsCards";
import ActiveEvents from "../../components/admin/ActiveEvents";
import RecentSubmissions from "../../components/admin/RecentSubmissions";
import QuickActions from "../../components/admin/QuickActions";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  return (
    <>
      <StatsCards />
      <ActiveEvents />
      <RecentSubmissions />
      <QuickActions />
    </>
  );
};

export default AdminDashboard;
