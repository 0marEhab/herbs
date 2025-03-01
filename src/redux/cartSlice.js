// src/redux/cartSlice.js
import summaryApi from "@/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, quantity, variantId, accessToken }, { rejectWithValue }) => {
    console.log(variantId);
    try {
      const response = await axios.post(
        `https://ashaabe.runasp.net/api/ShoppingCart/${userId}/add-item`,
        {
          quantity,
          variantId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch the cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.getCart.url}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!Array.isArray(state.items)) {
          state.items = [];
        }
        state.items.push(action.payload);
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update the cart with fetched items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
