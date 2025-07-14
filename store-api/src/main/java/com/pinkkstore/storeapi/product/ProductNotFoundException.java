package com.pinkkstore.storeapi.product;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long productId) {
        super("Product with ID " + productId + " was not found");
    }
}
