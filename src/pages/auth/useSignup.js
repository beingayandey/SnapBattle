import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/toast/ToastNotification";
import { signupUser } from "../../api/api";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data, reset) => {
    setIsLoading(true);
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
      const response = await signupUser(apiData);
      showSuccess(response.data.message || "Account created successfully!");

      // Check if email is defined
      if (!data.email) {
        throw new Error("Email is undefined after signup.");
      }

      // Check email_verified_at to determine redirect
      if (response.data.user.email_verified_at === null) {
        navigate("/verify-email", { state: { email: data.email } });
      } else {
        navigate("/login", { state: { email: data.email } });
      }

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
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
};

export default useSignup;
