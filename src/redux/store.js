import { configureStore } from "@reduxjs/toolkit";
import userRolesReducer from "./slices/userRolesSlice";

export const store = configureStore({
  reducer: {
    userRoles: userRolesReducer,
  },
});
