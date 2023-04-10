import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFilterState, sortURLType } from "../types";

import { categoryIdType } from "components/Categories";

const initialState: IFilterState = {
  category: "all",
  sortProperty: "rating",
  sortBy: "desc",
  search: "",
};

export const filtersStore = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<categoryIdType>) => {
      state.category = action.payload;
    },
    setSortItem: (state, action: PayloadAction<sortURLType>) => {
      state.sortProperty = action.payload.sortProperty;
      state.sortBy = action.payload.sortBy;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setFilters: (state, action: PayloadAction<IFilterState>) => {
      state.search = action.payload.search;
      state.category = action.payload.category;
      state.sortBy = action.payload.sortBy;
      state.sortProperty = action.payload.sortProperty;
    },
    resetFilters: (state) => {
      state.search = "";
      state.category = "all";
      state.sortProperty = "rating";
      state.sortBy = "desc";
    },
  },
});

export const { setCategory, setSortItem, setSearch, setFilters, resetFilters } =
  filtersStore.actions;

export const filtersSelector = (state: RootState) => state.filtersReducer;

export const filtersReducer = filtersStore.reducer;
