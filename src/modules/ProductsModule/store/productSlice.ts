import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  PoductsLoadingStatus,
  IProductItem,
  IProductState,
  IFilterState,
} from "../types";

const initialState: IProductState = {
  products: [],
  loadingIndicator: PoductsLoadingStatus.LOADING,
};

export const fetchProducts = createAsyncThunk<IProductItem[], IFilterState>(
  "products/getproducts",

  async (params) => {
    const { category, search, sortBy, sortProperty } = params;

    const categoryUrl =
      category && category === `all` ? "" : `&category=${category}`;
    const searchUrl = search && `&search=${search}`;
    const sortProp = sortProperty && `&sortBy=${sortProperty}`;
    const sortOrder = sortBy && `&order=${sortBy}`;
    const { data } = await axios.get<IProductItem[]>(
      `https://63d4ec9fc52305feff6abce9.mockapi.io/items?${categoryUrl}${searchUrl}${sortProp}${sortOrder}`
    );
    return data;
  }
);

export const productsStore = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loadingIndicator = PoductsLoadingStatus.LOADING;
      state.products = [];
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loadingIndicator = PoductsLoadingStatus.ERROR;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const products = action.payload;
      state.products = products;

      if (products.length === 0) {
        state.loadingIndicator = PoductsLoadingStatus.EMPTY;
      } else {
        state.loadingIndicator = PoductsLoadingStatus.SUCCESS;
      }
    });
  },
});

export const productsSelector = (state: RootState) => state.productsReducer;

export const productsReducer = productsStore.reducer;
