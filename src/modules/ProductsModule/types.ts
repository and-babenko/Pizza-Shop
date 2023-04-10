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

type portionItemType = {
  weight: number;
  price: number;
};

export interface IProductItem {
  id: string;
  name: string;
  category: categoryIdType;
  rating: number;
  shortDescription: string;
  longDescription: string;
  allergens: string;
  startPrice: number;
  portions: portionItemType[];
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
