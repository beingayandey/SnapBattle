import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useToast } from "../../components/toast/ToastNotification";
import { signupUser } from "../../api/api";

// Yup validation schema
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .test("name-parts", "Please provide a valid full name", (value) => {
      const nameParts = value.trim().split(/\s+/);
      return nameParts.length >= 1;
    }),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\+?[\d\s-]{10,}$/, {
      message: "Invalid phone number",
      excludeEmptyString: false,
    }),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms and Conditions")
    .required("You must agree to the Terms and Conditions"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    try {
      // Split fullName into first_name, middle_name, and last_name
      const nameParts = data.fullName.trim().split(/\s+/);
      let first_name = "";
      let middle_name = "";
      let last_name = "";

      if (nameParts.length === 1) {
        first_name = nameParts[0];
      } else if (nameParts.length === 2) {
        first_name = nameParts[0];
        last_name = nameParts[1];
      } else {
        first_name = nameParts[0];
        middle_name = nameParts.slice(1, -1).join(" ");
        last_name = nameParts[nameParts.length - 1];
      }

      // Prepare data for API
      const apiData = {
        first_name,
        middle_name,
        last_name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      // Call the signup API
      await signupUser(apiData);
      showSuccess("Account created successfully!");

      // Log the email to debug
      console.log("Email before navigation:", data.email);

      // Check if email is defined before navigating
      if (!data.email) {
        throw new Error("Email is undefined after signup.");
      }

      // Navigate to login page with email as a query parameter
      navigate(`/login?email=${encodeURIComponent(data.email)}`);

      // Reset the form after navigation
      reset();
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        const errorMessage =
          errorMessages.join(", ") || "Failed to create account.";
        showError(errorMessage);
      } else if (error.response?.data?.message) {
        showError(error.response.data.message);
      } else {
        showError(
          error.message || "Failed to create account. Please try again."
        );
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type="text"
                id="fullName"
                {...register("fullName")}
                className={`input-field ${
                  errors.fullName ? "input-error" : ""
                }`}
                placeholder="Full Name"
                autoComplete="off" // Disable autofill for this field
              />
            </div>
            {errors.fullName && (
              <p className="error-message">{errors.fullName.message}</p>
            )}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`input-field ${errors.email ? "input-error" : ""}`}
                placeholder="Email"
                autoComplete="off" // Disable autofill for this field
              />
            </div>
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="text"
                id="password"
                {...register("password")}
                className={`input-field ${
                  errors.password ? "input-error" : ""
                } ${!showPassword ? "password-mask" : ""}`}
                placeholder="Password"
                autoComplete="new-password" // Explicitly mark as new password to prevent saved info popup
              />
              <button
                type="button"
                className="eye-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="text"
                id="confirmPassword"
                {...register("confirmPassword")}
                className={`input-field ${
                  errors.confirmPassword ? "input-error" : ""
                } ${!showConfirmPassword ? "password-mask" : ""}`}
                placeholder="Confirm Password"
                autoComplete="new-password" // Explicitly mark as new password to prevent saved info popup
              />
              <button
                type="button"
                className="eye-button"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FiPhone className="input-icon" />
              <input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber")}
                className={`input-field ${
                  errors.phoneNumber ? "input-error" : ""
                }`}
                placeholder="Phone Number"
                autoComplete="tel" // Allow autofill for phone number
              />
            </div>
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register("terms")}
                className={`checkbox-input ${
                  errors.terms ? "input-error" : ""
                }`}
              />
              I agree to the{" "}
              <a href="/terms" className="terms-link">
                Terms and Conditions
              </a>
            </label>
            {errors.terms && (
              <p className="error-message">{errors.terms.message}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
