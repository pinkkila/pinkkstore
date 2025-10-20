package com.pinkkstore.storeapi.order;

import com.pinkkstore.storeapi.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final ProductService productService;
    
    public OrderDto toOrderDto(Order order) {
        var orderItemsDto = order.getOrderItems().stream()
                .map(this::toOrderItemDto)
                .toList();
        return new OrderDto(order.getId(), order.getOrderDate(), order.getTotalPrice(), orderItemsDto);
    }
    
    public OrderDto.OrderItemDto toOrderItemDto(OrderItem orderItem) {
        var product = productService.getProductById(orderItem.getProductId());
        return new OrderDto.OrderItemDto(orderItem.getId(), orderItem.getProductQty(), orderItem.getProductOrderPrice(), product.getProductName(), product.getImageUrl());
        
    }
    
}
