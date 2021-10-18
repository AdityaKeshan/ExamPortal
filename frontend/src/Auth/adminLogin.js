import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "loginAdmin",
  initialState: {
    admin: { name: "", email: "", token: "" },
  },
  reducers: {
    setAdminName: (state, action) => {
      state.admin = { ...state.admin, ...{ name: action.payload } };
    },
    setAdminEmail: (state, action) => {
      state.admin = { ...state.admin, ...{ email: action.payload } };
    },
    setAdminToken: (state, action) => {
      state.admin = { ...state.admin, ...{ token: action.payload } };
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    resetAdmin: (state) => {
      state.admin = { name: "", email: "", token: "" };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin, resetAdmin } = adminSlice.actions;

export default adminSlice.reducer;
