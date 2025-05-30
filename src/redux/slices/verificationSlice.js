import { createSlice } from "@reduxjs/toolkit";

const verificationSlice = createSlice({
  name: "verification",
  initialState: {
    isPhoneVerified: true, // Default to true to avoid modal on initial load
  },
  reducers: {
    setPhoneVerificationStatus(state, action) {
      state.isPhoneVerified = action.payload;
    },
  },
});

export const { setPhoneVerificationStatus } = verificationSlice.actions;
export default verificationSlice.reducer;
