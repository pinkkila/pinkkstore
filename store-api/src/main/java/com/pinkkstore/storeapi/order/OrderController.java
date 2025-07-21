package com.pinkkstore.storeapi.order;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    
    @GetMapping
    public ResponseEntity<List<Order>> getAll(Authentication authentication) {
        return ResponseEntity.ok(orderService.getOrders(authentication));
    }
    
    @GetMapping("/{requestedId}")
    public ResponseEntity<Order> getOrder(@PathVariable Long requestedId, Authentication authentication) {
        return ResponseEntity.ok(orderService.getOrder(authentication, requestedId));
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest, Authentication authentication, UriComponentsBuilder ucb) {
        var createdOrder = orderService.createOrder(authentication, orderRequest);
        URI locationOfCreatedOrder = ucb
                .path("/orders/{id}")
                .buildAndExpand(createdOrder.getId())
                .toUri();
        return ResponseEntity.created(locationOfCreatedOrder).body(createdOrder);
    }
    
}
