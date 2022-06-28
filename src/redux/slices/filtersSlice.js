import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortItem: (state, action) => {
      state.sortItem = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.page = action.payload.page;
      state.search = action.payload.headerSearch;
      state.category = action.payload.category;
      state.sortItem = action.payload.sort;
    },
  },
});

export const { setCategory, setSortItem, setSearch, setPage, setFilters } =
  filters.actions;

export default filters.reducer;
