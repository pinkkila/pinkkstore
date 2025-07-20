package com.pinkkstore.storeapi.cart;

import org.springframework.stereotype.Component;

@Component
public class CartMapper {
    
    public CartDto toCartDto(Cart cart) {
        var items = cart.getCartItems().stream()
                .map(item -> new CartDto.CartItemDto(item.getProductId(), item.getProductQty()))
                .toList();
        int totalQty = items.stream()
                .mapToInt(CartDto.CartItemDto::productQty)
                .sum();
        return new CartDto(items, totalQty);
    }
    
}
