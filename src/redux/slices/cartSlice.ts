import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
};

type DeletedItemType = {
  count: number;
  id: number;
};

export type CartItemType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  currentPizzaType: string;
  currentPizzaSize: number;
  count: number;
};

interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItemType>) => {
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

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.totalCount--;
      const removedPizza = state.items.find(
        (elem) => elem.id === action.payload
      );
      if (removedPizza) {
        removedPizza.count--;
      }
      if (removedPizza && removedPizza.count === 0) {
        const removedPizzaIndex = state.items.indexOf(removedPizza);
        state.items.splice(removedPizzaIndex, 1);
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    deleteItem: (state, action: PayloadAction<DeletedItemType>) => {
      const removedPizza = state.items.find(
        (elem) => elem.id === action.payload.id
      );

      if (removedPizza) {
        const removedPizzaIndex = state.items.indexOf(removedPizza);
        state.items.splice(removedPizzaIndex, 1);
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

export const cartSelector = (state: RootState) => state.cart;

export const itemInCartSelector = (id: number) => (state: RootState) =>
  state.cart.items.find((el) => el.id === id);

export default cartSlice.reducer;
