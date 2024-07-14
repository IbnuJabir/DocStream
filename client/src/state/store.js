// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentSlice";
import dialogReducer from "./dialogSlice";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";
import doctorReducer from "./doctorSlice";
import unAvailableDatesReducer from "./unAvailableDatesSlice";
import DepartmentReducer from "./departmentSlice";

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    dialog: dialogReducer,
    user: userReducer,
    transactions: transactionReducer,
    doctors: doctorReducer,
    unAvailableDates: unAvailableDatesReducer,
    departments: DepartmentReducer,
  },
});
