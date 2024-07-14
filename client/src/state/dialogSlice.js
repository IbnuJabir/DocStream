import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialog: false,
  successDialog: false,
  cancelDialog: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.dialog = true;
    },
    closeDialog: (state) => {
      state.dialog = false;
    },
    openSuccessDialog: (state) => {
      state.successDialog = true;
    },
    closeSuccessDialog: (state) => {
      state.successDialog = false;
    },
    openCancelDialog: (state) => {
      state.cancelDialog = true;
    },
    closeCancelDialog: (state) => {
      state.cancelDialog = false;
    },
  },
});

export const {
  openDialog,
  closeDialog,
  openSuccessDialog,
  closeSuccessDialog,
  openCancelDialog,
  closeCancelDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
