import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../Auth/studentLogin";
import adminReducer from "../Auth/adminLogin";

export default configureStore({
  reducer: {
    loginStudent: studentReducer,
    loginAdmin: adminReducer,
  },
});
