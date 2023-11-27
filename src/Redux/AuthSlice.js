import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getToken = createAsyncThunk(
  "Auth/getToken",
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
      console.log(res);

      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState: { token: null },
  extraReducers: {
    [getToken.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getToken.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    },
    [getToken.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default AuthSlice.reducer;
