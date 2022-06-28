import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pizzas: [],
  loadingIndicator: "",
};

export const fetchPizzasFromStore = createAsyncThunk(
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
    [fetchPizzasFromStore.pending]: (state) => {
      state.loadingIndicator = "pending";
      state.pizzas = [];
    },
    [fetchPizzasFromStore.rejected]: (state, action) => {
      state.loadingIndicator = "rejected";
      console.log(action.error.message);
      state.pizzas = [];
    },

    [fetchPizzasFromStore.fulfilled]: (state, action) => {
      state.loadingIndicator = "fulfilled";
      state.pizzas = action.payload;
    },
  },
});

export const {} = pizzasStore.actions;

export default pizzasStore.reducer;
