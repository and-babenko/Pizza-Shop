import { createSlice } from "@reduxjs/toolkit";

const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
};

const initialState = {
  items: [],
  total: {
    price: 0,
    count: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.total.count++;
      const addedPizza = state.items.find(
        (elem) => elem.id === action.payload.id
      );
      if (addedPizza) {
        addedPizza.count++;
      } else {
        state.items.push(action.payload);
      }
      state.total.price = calcTotalPrice(state.items);
    },

    removeItemFromCart: (state, action) => {
      state.total.count--;
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
      state.total.price = calcTotalPrice(state.items);
    },

    deleteItem: (state, action) => {
      const removedPizzaIndex = state.items.indexOf(action.payload.id);
      state.items.splice(removedPizzaIndex, 1);

      state.total.count -= action.payload.count;
      state.total.price = calcTotalPrice(state.items);
    },

    deleteAllItems: (state) => {
      state.items = [];
      state.total.price = 0;
      state.total.count = 0;
    },
  },
});

export const { addItemToCart, deleteAllItems, removeItemFromCart, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;
