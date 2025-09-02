
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showForm: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    showForm: (state) => {
      state.showForm = true;
    },
    hideForm: (state) => {
      state.showForm = false;
    },
  },
});

export const { showForm, hideForm } = formSlice.actions;
export default formSlice.reducer;
