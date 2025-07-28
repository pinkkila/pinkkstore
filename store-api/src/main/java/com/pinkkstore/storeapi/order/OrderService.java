package com.pinkkstore.storeapi.order;

import com.pinkkstore.storeapi.product.ProductNotEnoughStockException;
import com.pinkkstore.storeapi.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductService productService;
    
    public List<Order> getAllOrders(Authentication authentication) {
        return orderRepository.findAllByAppUsername(authentication.getName());
    }
    
    public Order getOrder(Authentication authentication, Long orderId) {
        return orderRepository.findByAppUsernameAndId(authentication.getName(), orderId)
                .orElseThrow(() -> new OrderNotFoundException(authentication));
    }
    
    @Transactional
    public Order createOrder(Authentication authentication, OrderRequest orderRequest) {
        Set<OrderItem> orderItems = orderRequest.orderItems().stream()
                .map(orderItemRequest ->{
                    var product = productService.reduceStockQty(orderItemRequest.productId(), orderItemRequest.productQty());
                    return new OrderItem(null, orderItemRequest.productQty(), product.getPrice(), product.getId());
                })
                .collect(Collectors.toSet());
        
        var priceTotal = orderItems.stream()
                .mapToDouble(item -> item.getProductPrice() * item.getProductQty())
                .sum();
        
        var newOrder = new Order(null, authentication.getName(), LocalDateTime.now(), priceTotal, orderItems);
        return orderRepository.save(newOrder);
    }
    
}
