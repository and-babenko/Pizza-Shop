//Store.js
import { configureStore } from "@reduxjs/toolkit";
import pizzas from "./slices/pizzasSlice";
import filters from "./slices/filtersSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: { pizzas, filters, cart },
});
