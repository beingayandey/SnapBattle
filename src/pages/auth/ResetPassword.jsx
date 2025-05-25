import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../components/toast/ToastNotification";
import "./Login.css";
import { resetPassword } from "../../api/api";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token and email from query parameters
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      showError("Passwords do not match");
      return;
    }
    if (!token || !email) {
      setError("Invalid or missing reset token or email");
      showError("Invalid or missing reset token or email");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Call resetPassword API
      const response = await resetPassword(
        token,
        email,
        formData.password,
        formData.confirmPassword
      );
      showSuccess(response.message || "Password reset successfully");

      // Show "Logging you in" toast with spinner
      showSuccess(
        <div>
          Logging you in <span className="loader"></span>
        </div>,
        { autoClose: false }
      );

      // Extract token and user data
      const bearerToken = response.data?.token;
      const user = response.data?.user;
      if (!bearerToken || !user || !user._id || !user.roles || !user.roles[0]) {
        throw new Error("Invalid response data from reset password");
      }

      // Set auth data in localStorage (mimicking Login component)
      localStorage.setItem("token", bearerToken);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("role", user.roles[0]);
      localStorage.setItem("justLoggedIn", "true");

      // Clear form
      setFormData({ password: "", confirmPassword: "" });

      // Wait briefly to show the "Logging you in" toast
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect based on role
      if (user.roles.includes("admin")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      let errorMessage = "Failed to reset password or log in.";
      if (err.response?.data?.errors) {
        if (typeof err.response.data.errors === "object") {
          errorMessage = Object.values(err.response.data.errors)
            .flat()
            .join(", ");
        } else {
          errorMessage = err.response.data.errors;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Reset Password</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input-field"
                placeholder="New Password"
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="input-field"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <span className="loader"></span> : "Reset Password"}
          </button>
        </form>
        <p className="signup-text">
          Back to{" "}
          <Link to="/login" className="signup-link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
