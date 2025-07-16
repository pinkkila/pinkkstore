package com.pinkkstore.storeapi.order;

import java.util.List;

public record OrderRequest(double totalPrice, List<OrderItemRequest> orderItems) {
    public record OrderItemRequest(int productQty, double productPrice, Long productId) {
    }
}


