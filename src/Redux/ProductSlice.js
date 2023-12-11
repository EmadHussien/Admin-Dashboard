import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "get/Products",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        "https://e-commerce-backend-two-rouge.vercel.app/products",
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

export const createProduct = createAsyncThunk(
  "create/Product",
  async ({ product, userRequests }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await userRequests.post("/products", product, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.status);
    }
  }
);

export const editProduct = createAsyncThunk(
  "edit/Product",
  async ({ newProduct, userRequests, productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await userRequests.put("/products/" + productId, newProduct, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.status);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "delete/Product",
  async ({ userRequests, productId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await userRequests.delete(
        "/products/" + productId,
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

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: null,
    isLoading: false,
    error: null,
    fulfilled: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        const extractedData = action.payload.map(
          ({ _id, title, price, inStock, img }) => ({
            id: _id,
            name: title,
            img,
            stock: inStock,
            price: `$${price}`,
          })
        );
        state.products = extractedData;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.fulfilled = false;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
        state.fulfilled = true;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.fulfilled = false;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.fulfilled = true;
        const updatedProduct = action.payload;
        const indexToUpdate = state.products.findIndex(
          (item) => item.id === updatedProduct._id
        );

        const { _id, title, price, inStock, img } = updatedProduct;
        const updatedProductFields = {
          id: _id,
          name: title,
          img,
          stock: inStock,
          price: `$${price}`,
        };
        state.products.splice(indexToUpdate, 1, updatedProductFields);
      })
      .addCase(editProduct.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.fulfilled = true;
        // delete logic in state
        state.products.splice(
          state.products.findIndex(
            (item) => item._id === action.payload.success
          ),
          1
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      }),
});

export const { setNewToken } = ProductSlice.actions;

export default ProductSlice.reducer;
