import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userEmail: null,
  isLoggedIn: false,
  error: null,
  isLoading: true, // Initially true to indicate loading state
};

// Thunk for checking user authentication status
export const checkUserStatus = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_DOCSTREAM_API_URL}/user/checkUserAuth`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

// Thunk for user login
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_DOCSTREAM_API_URL}/user/login`, data, {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

// Thunk for user signup
export const signup = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_DOCSTREAM_API_URL}/user/signup`, data, {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

// Thunk for user logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOCSTREAM_API_URL}/user/logout`, {
        withCredentials: true,
      });
      console.log('user', result.data)
      return result.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.userEmail = action.payload.userEmail;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(checkUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
