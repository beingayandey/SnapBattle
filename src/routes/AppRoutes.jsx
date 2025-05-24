import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import UserLayout from "../components/layout/UserLayout";
import { ToastProvider } from "../components/toast/ToastNotification";
import EventDetailPage from "../components/user/UserVote/EventDetailPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminEventsPage from "../pages/admin/AdminEventsPage";
import AdminEventSubmissionsPage from "../pages/admin/AdminEventSubmissionsPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AdminStatsPage from "../pages/admin/AdminStatsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminVotingPage from "../pages/admin/AdminVotingPage";
import CreateEventPage from "../pages/admin/CreateEventPage";
import EditEventPage from "../pages/admin/EditEventPage";
import EventManagePage from "../pages/admin/EventManagePage";
import ManageRolesPage from "../pages/admin/ManageRolesPage";
import SubmissionsPage from "../pages/admin/SubmissionsPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import Signup from "../pages/auth/Signup";
import MySubmissions from "../pages/user/MySubmissions";
import MyVotes from "../pages/user/MyVotes";
import NotificationsPage from "../pages/user/NotificationsPage";
import ProfilePage from "../pages/user/ProfilePage";
import RulesPage from "../pages/user/RulesPage";
import SettingsPage from "../pages/user/SettingsPage";
import UploadPhoto from "../pages/user/UploadPhoto";
import UserDashboard from "../pages/user/UserDashboard";
import UserEventDetails from "../pages/user/UserEventDetails";
import VotePage from "../pages/user/VotePage";
import ProtectedRoute from "../ProtectedRoute";
import HomePage from "../pages/HomePage";

const AppRoutes = () => (
  <ToastProvider>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events/:eventId/manage" element={<EventManagePage />} />
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
          <Route path="event/:eventId" element={<UserEventDetails />} />
          <Route path="submissions" element={<MySubmissions />} />
          <Route path="upload" element={<UploadPhoto />} />
          <Route path="vote" element={<VotePage />} />
          <Route path="vote/:eventId" element={<EventDetailPage />} />
          <Route path="my-votes" element={<MyVotes />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="rules" element={<RulesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </ToastProvider>
);

export default AppRoutes;
