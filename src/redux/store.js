import { configureStore } from "@reduxjs/toolkit";
import userRolesReducer from "./slices/userRolesSlice";
import createEventReducer from "./slices/createEventSlices";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    userRoles: userRolesReducer,
    theme: themeReducer,
    createEvent: createEventReducer,
  },
});
// Initialize theme on app load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
