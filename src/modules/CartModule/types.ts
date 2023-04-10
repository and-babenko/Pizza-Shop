export interface IPortionItem {
  weight: number;
  price: number;
}

export interface ICartItem {
  id: string;
  name: string;
  portion: IPortionItem;
  count: number;
}

export interface ICartState {
  items: ICartItem[];
  totalPrice: number;
  totalCount: number;
}
