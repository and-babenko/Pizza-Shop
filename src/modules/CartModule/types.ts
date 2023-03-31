export interface ICartItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  currentPizzaType: string;
  currentPizzaSize: number;
  count: number;
}

export interface IDeletedItem {
  count: number;
  id: number;
}

export interface ICartState {
  items: ICartItem[];
  totalPrice: number;
  totalCount: number;
}
