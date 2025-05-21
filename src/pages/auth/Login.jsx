import React, { useEffect, useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Login.css";
import { useToast } from "../../components/toast/ToastNotification";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const [body, setBody] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [theme, setTheme] = useState("light");
  const [showPassword, setShowPassword] = useState(false);
  const { showSuccess, showError } = useToast();

  const { response, error, loading, apiHandler } = useAxios();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (form) => {
    const data = {
      url: '/login',
      method: 'POST',
      data: body,
    }
    await apiHandler(data);
  }
  useEffect(() => {
    if (response && response.data) {
      localStorage.setItem('token', response.data.token);
      showSuccess("Login successful!");
    }
    if (error) showError(error || "Login failed!");
  }, [response, error])

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Log In</h2>
        <form action={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                onChange={(e) => setBody({ ...body, email: e.target.value })}
                className="input-field"
                placeholder="Email"
                
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
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

          <button type="submit" className="submit-button">
            Sign In
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
