export type TCart = {
  items: TCartItem[];
  totalQty: number;
};

export type TCartItem = {
  productId: number;
  productQty: number;
  inStock: boolean;
};

export type TCartRequest = {
  productId: number;
  productQty: number;
};

export type TNewOrderRequest = {
  orderItems: TNewOrderItemRequest[];
};

type TNewOrderItemRequest = {
  productId: number;
  productQty: number;
};

export type TOrder = {
  orderId: number;
  orderDate: string; //TODO refactor to date
  totalPrice: number;
  orderItems: TOrderItem[];
};

export type TOrderItem = {
  orderItemId: number;
  productQty: number;
  productOrderPrice: number;
  productName: string;
  imageUrl: string;
};

export type TProduct = {
  id: number;
  productName: string;
  productDesc: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
};

export type TProductDetailsSmall = {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
};

export type TProductWithCategoryName = {
  productDto: TProduct;
  categoryName: string;
}

export type TPage = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export type TProductsPage = {
  content: TProduct[];
  page: TPage;
}
