import React, { useEffect, useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setPhoneVerificationStatus,
  cleanupVerification,
} from "../../redux/slices/verificationSlice";
import "./Login.css";
import { useToast } from "../../components/toast/ToastNotification";
import { loginUser } from "../../api/api";

const Login = () => {
  const [body, setBody] = useState({
    loginId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redirect if already logged in
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // Pre-fill email from location.state
  useEffect(() => {
    const email = location.state?.email;
    if (email && email !== "undefined") {
      setBody((prev) => ({ ...prev, loginId: email }));
    }
  }, [location]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(body.loginId, body.password);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.user.roles[0]);
      sessionStorage.setItem("userId", response.data.user._id);
      sessionStorage.setItem("justLoggedIn", "true");
      sessionStorage.setItem("phone", response.data.user.phone);
      // Update phone verification status in Redux and localStorage
      const isAdmin = response.data.user.roles.includes("admin");
      const isPhoneVerified = isAdmin
        ? true
        : response.data.user.phone_verified_at !== null;
      dispatch(setPhoneVerificationStatus(isPhoneVerified));

      setBody({ loginId: "", password: "" });
      showSuccess("Login successful!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      let errorMessage = "Login failed!";
      if (err.response?.data?.errors) {
        if (typeof err.response.data.errors === "string") {
          errorMessage = err.response.data.errors;
        } else if (typeof err.response.data.errors === "object") {
          errorMessage =
            Object.values(err.response.data.errors).join(", ") || errorMessage;
        }
      }
      setError(errorMessage);
      showError(errorMessage);
      // Cleanup verification status on failed login
      dispatch(cleanupVerification());
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    if (submit) {
      handleLogin();
      setSubmit(false);
    }
  }, [submit]);

  if (token) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-content">
          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <h2 className="login-title">Log In</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="text"
                  id="loginId"
                  value={body.loginId}
                  onChange={(e) =>
                    setBody((prev) => ({ ...prev, loginId: e.target.value }))
                  }
                  className="input-field"
                  placeholder="Email or Username"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="input-group">
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"} // Dynamic type based on showPassword
                  id="password"
                  value={body.password}
                  onChange={(e) =>
                    setBody((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="input-field" // Removed password-mask class
                  placeholder="Password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <Link to="/forgot-password" className="forgot-password-link">
              Forgotten Password?
            </Link>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? <span className="loader"></span> : "Log In"}
            </button>
          </form>

          <p className="signup-text">
            No account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
