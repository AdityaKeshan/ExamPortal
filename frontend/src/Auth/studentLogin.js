import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "loginStudent",
  initialState: {
    student: { name: "", email: "", token: "" },
  },
  reducers: {
    setStudentName: (state, action) => {
      state.student = { ...state.student, ...{ name: action.payload } };
    },
    setStudentEmail: (state, action) => {
      state.student = { ...state.student, ...{ email: action.payload } };
    },
    setStudentToken: (state, action) => {
      state.student = { ...state.student, ...{ token: action.payload } };
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    resetStudent: (state,action) => {
      state.student = { name: "", email: "", token: "" };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStudent, resetStudent } = studentSlice.actions;

export default studentSlice.reducer;
