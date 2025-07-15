package com.pinkkstore.storeapi.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/carts")
public class CartController {
    private final CartService cartService;
    
    @GetMapping
    private ResponseEntity<Cart> getCart(Authentication authentication) {
        var cart = cartService.getCart(authentication);
        return ResponseEntity.ok(cart);
    }
    
    @PutMapping
    private ResponseEntity<Cart> updateCart(@RequestBody CartRequest cartRequest, Authentication authentication) {
        var updatedCart = cartService.updateCart(cartRequest, authentication);
        return ResponseEntity.ok(updatedCart);
    }
    
}
