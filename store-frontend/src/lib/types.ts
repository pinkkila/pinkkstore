export type TCart = {
  items: TCartItem[];
  totalQty: number;
};

export type TCartItem = {
  productId: number;
  productQty: number;
};

export type TCartRequest = {
  productId: number;
  productQty: number;
};

export type TOrderRequest = {
  totalPrice: number;
  orderItems: TOrderItemRequest[];
};

type TOrderItemRequest = {
  productQty: number;
  productPrice: number;
  productId: number;
};

export type TOrder = {
  id: number;
  appUsername: string;
  orderDate: string; //TODO refactor to date
  totalPrice: number;
  orderItems: TOrderItem[];
};

export type TOrderItem = {
  id: number;
  productQty: number;
  productPrice: number;
  productId: number;
};

export type TProduct = {
  id: number;
  productName: string;
  productDesc: string;
  price: number;
};

export type TProductDetailsSmall = {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
};
