import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUser, FiMail } from "react-icons/fi";
import PasswordInput from "./PasswordInput";
import TermsCheckbox from "./TermsCheckbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

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
    .matches(/^\+\d{10,}$/, {
      message:
        "Phone number must include country code and be at least 10 digits",
      excludeEmptyString: false,
    }),
  countryCode: yup.string().required("Country code is required"),
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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [countryCode, setCountryCode] = useState("us"); // Default to US
  const [dialCode, setDialCode] = useState("+1"); // Default dial code for US
  const [geoLoading, setGeoLoading] = useState(true);

  // Fetch user's country based on IP
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const country = response.data.country_code?.toLowerCase() || "us";
        const countryDialCode = response.data.country_calling_code || "+1";
        setCountryCode(country);
        setDialCode(countryDialCode);
        setGeoLoading(false);
      } catch (error) {
        console.error("Error fetching geolocation:", error);
        setCountryCode("us");
        setDialCode("+1");
        setGeoLoading(false);
      }
    };
    fetchCountry();
  }, []);

  // Handle phone number change
  const handlePhoneChange = (value, country) => {
    // Clean the phone number: keep the "+" and digits only
    const cleanedValue = "+" + value.replace(/\D/g, "").replace(/^(\d+)/, "$1");

    setValue("phoneNumber", cleanedValue, { shouldValidate: true });
    setValue("countryCode", `+${country.dialCode}`, { shouldValidate: true });
  };

  const handleFormSubmit = (data) => {
    // Debug: Log the form data to verify confirmPassword
    console.log("Form Data:", data);
    onSubmit(data, reset);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="signup-form"
      disabled={isLoading || geoLoading}
    >
      {geoLoading && <p className="loading-text">Loading country...</p>}
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
            disabled={isLoading || geoLoading}
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
            disabled={isLoading || geoLoading}
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
        isLoading={isLoading || geoLoading}
        autoComplete="new-password"
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        isLoading={isLoading || geoLoading}
        autoComplete="new-password"
      />

      <div className="input-group">
        <div className="input-wrapper">
          <PhoneInput
            country={countryCode}
            inputProps={{
              id: "phoneNumber",
              name: "phoneNumber",
              disabled: isLoading || geoLoading,
              className: `input-field ${
                errors.phoneNumber ? "input-error" : ""
              }`,
              autoComplete: "tel",
            }}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
            disabled={isLoading || geoLoading}
            buttonClass="country-dropdown"
            containerClass="phone-input-container"
            enableSearch
            disableDropdown={false}
          />
          <input type="hidden" {...register("countryCode")} />
        </div>
        {errors.phoneNumber && (
          <p className="error-message">{errors.phoneNumber.message}</p>
        )}
      </div>

      <TermsCheckbox
        register={register}
        errors={errors}
        isLoading={isLoading || geoLoading}
      />

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading || geoLoading}
      >
        {isLoading ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
