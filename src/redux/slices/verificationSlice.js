import { createSlice } from "@reduxjs/toolkit";

const verificationSlice = createSlice({
  name: "verification",
  initialState: {
    isPhoneVerified:
      localStorage.getItem("isPhoneVerified") === "true" || false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPhoneVerificationStatus(state, action) {
      state.isPhoneVerified = action.payload;
      localStorage.setItem("isPhoneVerified", action.payload); // Save to localStorage
    },
    cleanupVerification(state) {
      state.isPhoneVerified = false; // Reset to default
      localStorage.removeItem("isPhoneVerified"); // Clear from localStorage
    },
  },
});

export const { setPhoneVerificationStatus, cleanupVerification } =
  verificationSlice.actions;
export default verificationSlice.reducer;
