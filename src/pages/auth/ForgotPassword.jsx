import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/toast/ToastNotification";
import "./Login.css"; // Reuse Login.css for consistent styling

// Placeholder API function for password reset request
const requestPasswordReset = async (email) => {
  // Replace with your actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com") {
        resolve({ message: "Password reset email sent successfully!" });
      } else {
        reject({ response: { data: { errors: "Email not found" } } });
      }
    }, 1000);
  });
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await requestPasswordReset(email);
      showSuccess(response.message);
      setEmail("");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/login");
    } catch (err) {
      let errorMessage = "Failed to send password reset email.";
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
        <h2 className="login-title">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Email"
                required
              />
            </div>
            <p className="forgot-password-text">
              Enter your email address to receive a password reset link.
            </p>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <span className="loader"></span> : "Send Reset Link"}
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

export default ForgotPassword;
