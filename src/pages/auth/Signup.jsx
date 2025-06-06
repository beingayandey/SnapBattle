import React from "react";
import useSignup from "./useSignup";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  const { isLoading, onSubmit } = useSignup();

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-content">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <h2 className="signup-title">Sign Up</h2>
          <SignupForm onSubmit={onSubmit} isLoading={isLoading} />
          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
