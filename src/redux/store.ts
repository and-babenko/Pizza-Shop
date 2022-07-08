import { configureStore } from "@reduxjs/toolkit";
import pizzas from "./slices/pizzasSlice";
import filters from "./slices/filtersSlice";
import cart from "./slices/cartSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { pizzas, filters, cart },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
