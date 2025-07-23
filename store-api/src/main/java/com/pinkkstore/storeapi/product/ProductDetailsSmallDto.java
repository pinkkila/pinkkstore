package com.pinkkstore.storeapi.product;

public record ProductDetailsSmallDto(Long productId, String productName, String imageUrl, double price, boolean inStock) {
}
