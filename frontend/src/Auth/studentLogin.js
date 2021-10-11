import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "loginStudent",
  initialState: {
    student: { name: "" },
  },
  reducers: {
    setStudent: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.student = { ...state.student, ...{ name: action.payload } };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStudent } = studentSlice.actions;

export default studentSlice.reducer;
