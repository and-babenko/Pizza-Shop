import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pizzas: [],
  loadingIndicator: "",
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchpizzas",

  async (params) => {
    const { page, category, sortItem, search } = params;

    const pageUrl = `?page=${page}&limit=8`;
    const categoryUrl = !category ? "" : `&category=${category}`;
    const sortUrl = `&sortBy=${sortItem.property}&order=${sortItem.sortBy}`;
    const searchUrl = search ? `&search=${search}` : "";

    const { data } = await axios.get(
      `https://62a21329cd2e8da9b00234ff.mockapi.io/pizzas${pageUrl}${categoryUrl}${sortUrl}${searchUrl}`
    );
    return data;
  }
);

export const pizzasStore = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.loadingIndicator = "pending";
      state.pizzas = [];
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.loadingIndicator = "rejected";
      console.log(action.error.message);
      state.pizzas = [];
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.loadingIndicator = "fulfilled";
      state.pizzas = action.payload;
    },
  },
});

export const pizzasSelector = (state) => state.pizzas;

export default pizzasStore.reducer;
