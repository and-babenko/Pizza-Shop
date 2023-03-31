import ProductsModule from "./ProductsModule";
import { productsReducer, productsSelector } from "./store/productSlice";
import {
  filtersReducer,
  setCategory,
  setSortItem,
  setSearch,
  setFilters,
  resetFilters,
  filtersSelector,
} from "./store/filtersSlice";

import type { IProductItem } from "./types";

export { productsReducer, productsSelector };
export {
  filtersReducer,
  setCategory,
  setSortItem,
  setSearch,
  setFilters,
  resetFilters,
  filtersSelector,
};

export type { IProductItem };

export default ProductsModule;
