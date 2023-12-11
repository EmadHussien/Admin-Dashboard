import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "get/Users",
  async (userRequests, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await userRequests.get(
        "/users",

        {},
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.status);
    }
  }
);

export const createUser = createAsyncThunk(
  "create/User",
  async (newUser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        "https://e-commerce-backend-two-rouge.vercel.app/auth/register",
        newUser
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.status);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete/User",
  async ({ userRequests, userID }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await userRequests.delete(
        "/users/" + userID,
        {},
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.status);
    }
  }
);

const UserSlice = createSlice({
  name: "User",
  initialState: {
    Users: null,
    isLoading: false,
    error: null,
    fulfilled: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        const extractedData = action.payload.map(
          ({ _id, username, img, email }) => {
            if (username === "Admin") {
              return null; // Skip processing this user
            }

            return {
              id: _id,
              username,
              avatar:
                img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif",
              email,
              status: "Active",
            };
          }
        );

        // Filter out null values and update state.Users
        state.Users = extractedData.filter((user) => user !== null);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.fulfilled = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
        state.fulfilled = true;
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.fulfilled = true;
        // delete logic in state
        state.Users.splice(
          state.Users.findIndex((item) => item.id === action.payload.success),
          1
        );
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      }),
});

export const { setNewToken } = UserSlice.actions;

export default UserSlice.reducer;
