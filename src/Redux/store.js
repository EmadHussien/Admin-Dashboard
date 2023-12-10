import { configureStore } from "@reduxjs/toolkit";
import Auth from "./AuthSlice";
import Product from "./ProductSlice";
import User from "./UserSlice";
const store = configureStore({
  reducer: {
    Auth,
    Product,
    User,
  },
});

export default store;
