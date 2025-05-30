import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
  id,
  name,
  placeholder,
  register,
  errors,
  isLoading,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="input-group">
      <div className="input-wrapper">
        <FiLock className="input-icon" />
        <input
          type="text"
          id={id}
          {...register(name)}
          className={`input-field ${errors[name] ? "input-error" : ""} ${
            !showPassword ? "password-mask" : ""
          }`}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={isLoading}
        />
        <button
          type="button"
          className="eye-button"
          onClick={togglePasswordVisibility}
          disabled={isLoading}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
    </div>
  );
};

export default PasswordInput;
