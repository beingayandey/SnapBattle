import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { ToastProvider } from "../components/toast/ToastNotification";
import AdminLayout from "../components/layout/AdminLayout";
import UserLayout from "../components/layout/UserLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import EventManagePage from "../pages/admin/EventManagePage";
import CreateEventPage from "../pages/admin/CreateEventPage";
import ManageRolesPage from "../pages/admin/ManageRolesPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";
import AdminEventsPage from "../pages/admin/AdminEventsPage";
import AdminEventSubmissionsPage from "../pages/admin/AdminEventSubmissionsPage";
import EditEventPage from "../pages/admin/EditEventPage";
import SubmissionsPage from "../pages/admin/SubmissionsPage";
import ProtectedRoute from "../ProtectedRoute";
import AdminVotingPage from "../pages/admin/AdminVotingPage";
import AdminStatsPage from "../pages/admin/AdminStatsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";

const AppRoutes = () => {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="events/:eventId/manage"
              element={<EventManagePage />}
            />
            <Route path="create-event" element={<CreateEventPage />} />
            <Route path="roles" element={<ManageRolesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route
              path="events/:eventId/submissions"
              element={<AdminEventSubmissionsPage />}
            />
            <Route path="events/:id/edit" element={<EditEventPage />} />
            <Route path="submission" element={<SubmissionsPage />} />
            <Route path="voting" element={<AdminVotingPage />} />
            <Route path="stats" element={<AdminStatsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </ToastProvider>
  );
};

export default AppRoutes;
