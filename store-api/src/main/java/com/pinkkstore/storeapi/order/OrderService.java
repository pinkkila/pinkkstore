package com.pinkkstore.storeapi.order;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    
    public List<Order> getOrders(Authentication authentication) {
        return orderRepository.findAllByAppUsername(authentication.getName());
    }
    
    public Order getOrder(Authentication authentication, Long orderId) {
        return orderRepository.findByAppUsernameAndId(authentication.getName(), orderId)
                .orElseThrow(() -> new OrderNotFoundException(authentication));
    }
    
    public Order createOrder(Authentication authentication, OrderRequest orderRequest) {
        var newOrderItems = orderRequest.orderItems().stream()
                .map(orderItemRequest -> (
                        new OrderItem(null, orderItemRequest.productQty(), orderItemRequest.productPrice(), orderItemRequest.productId()))
                )
                .collect(Collectors.toSet());
        var newOrder = new Order(null, authentication.getName(), LocalDateTime.now(), orderRequest.totalPrice(), newOrderItems);
        
        return orderRepository.save(newOrder);
    }
    
}
