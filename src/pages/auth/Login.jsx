import React, { useEffect, useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import "./Login.css";
import { useToast } from "../../components/toast/ToastNotification";
import { loginUser } from "../../api/api";

const Login = () => {
  const [body, setBody] = useState({
    loginId: "",
    password: "",
  });
  const [theme, setTheme] = useState("light");
  const [showPassword, setShowPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Prefill email from query parameter on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    if (email && email !== "undefined") {
      // Add check for "undefined" string
      setBody((prev) => ({ ...prev, loginId: decodeURIComponent(email) }));
    }
  }, [location]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(body.loginId, body.password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.roles[0]);
      setBody({ loginId: "", password: "" });
      showSuccess("Login successful!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (response.data.user.roles.includes("admin")) {
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
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="text"
                id="loginId"
                value={body.loginId}
                onChange={(e) => setBody({ ...body, loginId: e.target.value })}
                className="input-field"
                placeholder="Email or Username"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={body.password}
                onChange={(e) => setBody({ ...body, password: e.target.value })}
                className="input-field"
                placeholder="Password"
                
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
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <span className="loader"></span> : "Log In"}
          </button>
        </form>

        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <p className="signup-text">
          No account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
