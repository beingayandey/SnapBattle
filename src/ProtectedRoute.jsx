import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
