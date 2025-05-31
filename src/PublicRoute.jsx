import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (token) {
    // Redirect authenticated users to their respective dashboard
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  // Allow access to public routes for unauthenticated users
  return <Outlet />;
};

export default PublicRoute;
