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

const AppRoutes = () => {
  return (
    <>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="events/:eventId/manage"
              element={<EventManagePage />}
            />
            <Route path="/admin/create-event" element={<CreateEventPage />} />
            <Route path="/admin/roles" element={<ManageRolesPage />} />

            {/* Add more nested admin routes here */}
          </Route>
          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            {/* Add more nested user routes here */}
          </Route>
          {/* Default Redirect */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </ToastProvider>
    </>
  );
};

export default AppRoutes;
