import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    title: "",
    subtitle: "",
    description: "",
    category: "",
    rules: "",
    start_date: "",
    end_date: "",
    visibility: true, // true means "public" (default)
  },
};

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { updateFormField, resetForm } = createEventSlice.actions;
export default createEventSlice.reducer;
