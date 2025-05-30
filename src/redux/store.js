import { configureStore } from "@reduxjs/toolkit";
import userRolesReducer from "./slices/userRolesSlice";
import createEventReducer from "./slices/createEventSlices";
import themeReducer from "./slices/themeSlice";
import verificationReducer from "./slices/verificationSlice";

export const store = configureStore({
  reducer: {
    userRoles: userRolesReducer,
    theme: themeReducer,
    createEvent: createEventReducer,
    verification: verificationReducer,
  },
});
// Initialize theme on app load
const savedTheme = sessionStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
