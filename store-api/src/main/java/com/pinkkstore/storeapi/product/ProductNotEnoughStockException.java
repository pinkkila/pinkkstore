package com.pinkkstore.storeapi.product;

public class ProductNotEnoughStockException extends RuntimeException {
    public ProductNotEnoughStockException(Long productId) {
      super("There is not enough stock with the given product. Product ID: " + productId);
    }
}
