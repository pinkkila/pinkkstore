package com.pinkkstore.storeapi.product;

public record ProductDto(Long id, String productName, String productDesc, String imageUrl, double price) {
}
