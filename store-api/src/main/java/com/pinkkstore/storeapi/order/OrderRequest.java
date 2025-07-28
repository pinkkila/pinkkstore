package com.pinkkstore.storeapi.order;

import java.util.List;

public record OrderRequest(List<OrderItemRequest> orderItems) {
    public record OrderItemRequest(Long productId, int productQty) {
    }
}


