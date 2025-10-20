package com.pinkkstore.storeapi.order;

import java.time.LocalDateTime;
import java.util.List;

public record OrderDto(Long orderId ,LocalDateTime orderDate, double totalPrice, List<OrderItemDto> orderItems) {
    public record OrderItemDto(Long orderItemId, int productQty, double productOrderPrice, String productName, String imageUrl) {
    }
}
