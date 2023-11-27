import { configureStore } from "@reduxjs/toolkit";
import Auth from "./AuthSlice";

const store = configureStore({
  reducer: {
    Auth,
  },
});

export default store;
