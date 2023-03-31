import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICartItem, ICartState, IDeletedItem } from "./types";

const initialState: ICartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const calcTotalPrice = (items: ICartItem[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      state.totalCount++;

      const addedProduct = state.items.find(
        (elem) => elem.id === action.payload.id
      );

      if (addedProduct) {
        addedProduct.count++;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItemFromCart: (state, action: PayloadAction<ICartItem>) => {
      state.totalCount--;

      const removedItem = state.items.find(
        (elem) => elem.id === action.payload.id
      );

      if (removedItem) {
        removedItem.count--;
      }

      if (removedItem && removedItem.count === 0) {
        const removedProductIntex = state.items.indexOf(removedItem);
        state.items.splice(removedProductIntex, 1);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    deleteItem: (state, action: PayloadAction<IDeletedItem>) => {
      const removedProduct = state.items.find(
        (elem) => elem.id === action.payload.id
      );

      if (removedProduct) {
        const removedProductIndex = state.items.indexOf(removedProduct);
        state.items.splice(removedProductIndex, 1);
      }

      state.totalCount -= action.payload.count;
      state.totalPrice = calcTotalPrice(state.items);
    },

    deleteAllItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItemToCart, deleteAllItems, removeItemFromCart, deleteItem } =
  cartSlice.actions;

export const cartSelector = (state: RootState) => state.cartReducer;

export const itemInCartSelector = (id: number) => (state: RootState) =>
  state.cartReducer.items.find((el) => el.id === id);

export const cartReducer = cartSlice.reducer;
