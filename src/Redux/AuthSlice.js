import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const LogIn = createAsyncThunk(
  "Auth/LogIn",
  async (adminCredintials, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        "https://e-commerce-backend-two-rouge.vercel.app/auth/login",
        adminCredintials,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.status);
    }
  }
);

export const logOut = createAsyncThunk("Auth/Logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post(
      "https://e-commerce-backend-two-rouge.vercel.app/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.status);
  }
});

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")) || null,
    isLoading: false,
    error: null,
    isAdmin: null,
  },
  reducers: {
    setNewToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(LogIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LogIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.isAdmin = action.payload.isAdmin;
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload.accessToken)
        );
      })
      .addCase(LogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.isAdmin = null;
        localStorage.removeItem("token");
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      }),
});
export const { setNewToken } = AuthSlice.actions;

export default AuthSlice.reducer;
