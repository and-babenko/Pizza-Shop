import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICartItem, ICartState, IPortionItem } from "./types";

const initialState: ICartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const calcTotalPrice = (items: ICartItem[]): number => {
  const totalPrice = items.reduce((sum, obj) => {
    return sum + obj.portion.price * obj.count;
  }, 0);

  return +totalPrice.toFixed(2);
};

const findProduct = (state: ICartState, product: ICartItem) =>
  state.items.find(
    (elem) =>
      elem.id === product.id &&
      elem.portion.weight === product.portion.weight &&
      elem.portion.price === product.portion.price
  );

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      state.totalCount++;

      const productInCart = findProduct(state, action.payload);

      if (productInCart) {
        productInCart.count++;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItemFromCart: (state, action: PayloadAction<ICartItem>) => {
      state.totalCount--;

      const productInCart = findProduct(state, action.payload);

      if (productInCart) {
        productInCart.count--;
      }

      if (productInCart && productInCart.count === 0) {
        const removedProductIntex = state.items.indexOf(productInCart);
        state.items.splice(removedProductIntex, 1);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    deleteItem: (state, action: PayloadAction<ICartItem>) => {
      const productInCart = findProduct(state, action.payload);

      if (productInCart) {
        const removedProductIndex = state.items.indexOf(productInCart);
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

export const itemInCartSelector =
  (id: string, portion: IPortionItem) => (state: RootState) =>
    state.cartReducer.items.find(
      (product) =>
        product.id === id &&
        product.portion.weight === portion.weight &&
        product.portion.price === portion.price
    );

export const cartReducer = cartSlice.reducer;
