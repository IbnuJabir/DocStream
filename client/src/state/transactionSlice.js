import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  transactions: [],
  transactionDetails: [],
  error: null,
  isLoading: true,
};

export const getAllTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOCSTREAM_API_URL}/transactions/getAll`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);
export const getTransactionDetails = createAsyncThunk(
  "transactions/tx_ref",
  async (tx_ref, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOCSTREAM_API_URL}/transactions/${tx_ref}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionDetails = action.payload;
      })
      .addCase(getTransactionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
