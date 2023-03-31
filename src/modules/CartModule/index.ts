import CartModule from "./CartModule";

import {
  cartReducer,
  itemInCartSelector,
  cartSelector,
  addItemToCart,
  deleteItem,
  deleteAllItems,
  removeItemFromCart,
} from "./cartSlice";

import type { ICartItem } from "./types";

export default CartModule;
export {
  cartReducer,
  itemInCartSelector,
  cartSelector,
  addItemToCart,
  deleteItem,
  deleteAllItems,
  removeItemFromCart,
  ICartItem,
};
