import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type sortItemType = {
  label: string;
  property: "rating" | "price" | "name";
  sortBy: "desc" | "inc";
};

export interface FilterSliceState {
  sortItem: sortItemType;
  search: string;
  category?: number;
  page?: number;
}

const initialState: FilterSliceState = {
  category: 0,
  sortItem: {
    label: "популярности, по убыванию",
    property: "rating",
    sortBy: "desc",
  },
  search: "",
  page: 1,
};

export const filters = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSortItem: (state, action: PayloadAction<sortItemType>) => {
      state.sortItem = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.page = action.payload.page;
      state.search = action.payload.search;
      state.category = action.payload.category;
      state.sortItem = action.payload.sortItem;
    },
    resetFilters: (state) => {
      state.page = 1;
      state.search = "";
      state.category = 0;
      state.sortItem = {
        label: "популярности, по убыванию",
        property: "rating",
        sortBy: "desc",
      };
    },
  },
});

export const {
  setCategory,
  setSortItem,
  setSearch,
  setPage,
  setFilters,
  resetFilters,
} = filters.actions;

export const filtersSelector = (state: RootState) => state.filters;

export default filters.reducer;
