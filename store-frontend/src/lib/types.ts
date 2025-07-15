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