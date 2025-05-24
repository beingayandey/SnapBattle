import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../components/toast/ToastNotification";
import "./Login.css"; // Reuse Login.css for consistent styling

// Placeholder API function for password reset
const resetPassword = async (token, password) => {
  // Replace with your actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length >= 8) {
        resolve({ message: "Password reset successfully!" });
      } else {
        reject({
          response: {
            data: { errors: "Password must be at least 8 characters long" },
          },
        });
      }
    }, 1000);
  });
};

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

  // Extract token from query parameter
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

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
    if (!token) {
      setError("Invalid or missing reset token");
      showError("Invalid or missing reset token");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await resetPassword(token, formData.password);
      showSuccess(response.message);
      setFormData({ password: "", confirmPassword: "" });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/login");
    } catch (err) {
      let errorMessage = "Failed to reset password.";
      if (err.response?.data?.errors) {
        errorMessage = err.response.data.errors;
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
