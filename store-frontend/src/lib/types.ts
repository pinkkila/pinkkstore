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