import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import PasswordInput from "./PasswordInput";
import TermsCheckbox from "./TermsCheckbox";

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

const SignupForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="signup-form"
      disabled={isLoading}
    >
      <div className="input-group">
        <div className="input-wrapper">
          <FiUser className="input-icon" />
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className={`input-field ${errors.fullName ? "input-error" : ""}`}
            placeholder="Full Name"
            autoComplete="off"
            disabled={isLoading}
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
            autoComplete="off"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      <PasswordInput
        id="password"
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        isLoading={isLoading}
        autoComplete="new-password"
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        isLoading={isLoading}
        autoComplete="new-password"
      />

      <div className="input-group">
        <div className="input-wrapper">
          <FiPhone className="input-icon" />
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber")}
            className={`input-field ${errors.phoneNumber ? "input-error" : ""}`}
            placeholder="Phone Number"
            autoComplete="tel"
            disabled={isLoading}
          />
        </div>
        {errors.phoneNumber && (
          <p className="error-message">{errors.phoneNumber.message}</p>
        )}
      </div>

      <TermsCheckbox
        register={register}
        errors={errors}
        isLoading={isLoading}
      />

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
