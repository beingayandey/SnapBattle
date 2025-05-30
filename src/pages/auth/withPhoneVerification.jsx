import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneVerificationModal from "../../pages/auth/PhoneVerificationModal";

const withPhoneVerification = (
  WrappedComponent,
  redirectPath = "/verify-phone"
) => {
  return (props) => {
    const navigate = useNavigate();
    const { isPhoneVerified } = useSelector((state) => state.verification);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const justLoggedIn = sessionStorage.getItem("justLoggedIn") === "true";
      const hasShownModal =
        sessionStorage.getItem("hasShownPhoneModal") === "true";

      if (!isPhoneVerified) {
        // Show modal on first visit after login (e.g., dashboard)
        if (justLoggedIn && !hasShownModal) {
          setShowModal(true);
          sessionStorage.setItem("hasShownPhoneModal", "true");
          sessionStorage.removeItem("justLoggedIn");
        }
        // Show modal on every protected route if phone is not verified
        else if (!justLoggedIn) {
          setShowModal(true);
        }
      }
    }, [isPhoneVerified]);

    const handleClose = () => {
      setShowModal(false);
    };

    const handleConfirm = () => {
      setShowModal(false);
      navigate(redirectPath);
    };

    return (
      <>
        <WrappedComponent {...props} />
        <PhoneVerificationModal
          isOpen={showModal}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </>
    );
  };
};

export default withPhoneVerification;
