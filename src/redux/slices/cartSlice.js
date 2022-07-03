import { createSlice } from "@reduxjs/toolkit";

const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
};

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.totalCount++;
      const addedPizza = state.items.find(
        (elem) => elem.id === action.payload.id
      );
      if (addedPizza) {
        addedPizza.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItemFromCart: (state, action) => {
      state.totalCount--;
      const removedPizza = state.items.find(
        (elem) => elem.id === action.payload
      );
      if (removedPizza) {
        removedPizza.count--;
      }
      if (removedPizza.count === 0) {
        const removedPizzaIndex = state.items.indexOf(removedPizza);
        state.items.splice(removedPizzaIndex, 1);
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    deleteItem: (state, action) => {
      const removedPizzaIndex = state.items.indexOf(action.payload.id);
      state.items.splice(removedPizzaIndex, 1);

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

export const cartSelector = (state) => state.cart;
export const itemInCartSelector = (state, id) =>
  state.cart.items.find((el) => el.id === id);

export default cartSlice.reducer;
