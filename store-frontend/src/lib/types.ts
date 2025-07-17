export type TCart = {
  id: number;
  appUsername: string;
  lastModified: Date;
  cartItems: TCartItem[];
}

export type TCartItem = {
  id: number;
  productQty: number;
  productId: number;
}

export type TCartRequest = {
  productId: number;
  productQty: number;
}

export type TOrderRequest = {
  totalPrice: number;
  orderItems: TOrderItemRequest[]
}

type TOrderItemRequest = {
  productQty: number;
  productPrice: number;
  productId: number;
}

export type TOrder = {
  id: number;
  appUsername: string;
  orderDate: string; //TODO refactor to date
  totalPrice: number;
  orderItems: TOrderItem[]
}

type TOrderItem = {
  id: number;
  productQty: number;
  productPrice: number;
  productId: number;
}