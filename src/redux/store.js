import { configureStore } from "@reduxjs/toolkit";
import userRolesReducer from "./slices/userRolesSlice";
import createEventReducer from "./slices/createEventSlices";

export const store = configureStore({
  reducer: {
    userRoles: userRolesReducer,
    createEvent: createEventReducer,
  },
});
