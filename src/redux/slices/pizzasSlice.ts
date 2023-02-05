import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { FilterSliceState } from "./filtersSlice";

export enum Status {
  //Сказали что стейт принимает один из этих ключей
  LOADING = "pending",
  SUCCESS = "completed",
  ERROR = "rejected",
}

export type PizzaItemType = {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  rating: number;
};

interface InitialStateType {
  pizzas: PizzaItemType[];
  loadingIndicator: Status;
}

const initialState: InitialStateType = {
  pizzas: [],
  loadingIndicator: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<PizzaItemType[], FilterSliceState>(
  "pizzas/getpizzas",

  async (params, thunkApi) => {
    const { page, category, sortItem, search } = params;

    const pageUrl = `?page=${page}&limit=8`;
    const categoryUrl = !category ? "" : `&category=${category}`;
    const sortUrl = `&sortBy=${sortItem.property}&order=${sortItem.sortBy}`;
    const searchUrl = search ? `&search=${search}` : "";

    const { data } = await axios.get<PizzaItemType[]>(
      `https://63d4ec9fc52305feff6abce9.mockapi.io/items${pageUrl}${categoryUrl}${sortUrl}${searchUrl}`
    );
    return data;
  }
);

export const pizzasStore = createSlice({
  name: "counter",
  initialState,
  reducers: {},

  // extraReducers: {
  //   [fetchPizzas.pending.toString()]: (state: InitialStateType) => {
  //     state.loadingIndicator = Status.LOADING;
  //     state.pizzas = [];
  //   },
  // [fetchPizzas.rejected.toString()]: (state: InitialStateType) => {
  //   state.loadingIndicator = Status.ERROR;
  //   state.pizzas = [];
  // },
  //   [fetchPizzas.fulfilled.toString()]: (state: InitialStateType, action) => {
  //     state.loadingIndicator = Status.SUCCESS;
  //     state.pizzas = action.payload;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.loadingIndicator = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.loadingIndicator = Status.ERROR;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.loadingIndicator = Status.SUCCESS;
      state.pizzas = action.payload;
    });
  },
});

export const pizzasSelector = (state: RootState) => state.pizzas;
export default pizzasStore.reducer;
