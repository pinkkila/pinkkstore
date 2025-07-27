package com.pinkkstore.storeapi.cart;

import java.util.List;

public record CartDto(List<CartItemDto> items, int totalQty) {
    public record CartItemDto(Long productId, int productQty, boolean inStock, int availableQty) {
    }
}
