import {
  categoryIdType,
  sortByType,
  sortPropertyType,
} from "components/Categories";

export enum PoductsLoadingStatus {
  LOADING = "pending",
  SUCCESS = "completed",
  ERROR = "rejected",
  EMPTY = "empty",
}

export type productType = "Тонкое" | "Традиционное";

export interface IProductItem {
  id: number;
  imageUrl: string;
  name: string;
  types: productType[];
  sizes: number[];
  price: number;
  rating: number;
  category: string;
}

export interface IProductState {
  products: IProductItem[];
  loadingIndicator: PoductsLoadingStatus;
}

export type IFilterState = {
  sortBy?: sortByType;
  sortProperty?: sortPropertyType;
  search?: string;
  category?: categoryIdType;
};

export type sortURLType = Pick<IFilterState, "sortBy" | "sortProperty">;
