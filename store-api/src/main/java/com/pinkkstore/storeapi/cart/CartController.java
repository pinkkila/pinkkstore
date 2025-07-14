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
    
    @PostMapping
    private ResponseEntity<Cart> createCart(@RequestBody CartRequest cartRequest, Authentication authentication, UriComponentsBuilder ucb) {
        var createdCart = cartService.createNewCart(cartRequest, authentication);
        URI locationOfCreatedCart = ucb
                .path("/carts/{id}")
                .buildAndExpand(createdCart.getId())
                .toUri();
        return ResponseEntity.created(locationOfCreatedCart).body(createdCart);
    }
    
    @PutMapping("/{cartId}")
    private ResponseEntity<Cart> updateCart(@PathVariable Long cartId, @RequestBody CartRequest cartRequest, Authentication authentication) {
        var updatedCart = cartService.updateCart(cartId, cartRequest, authentication);
        return ResponseEntity.ok(updatedCart);
    }
    
}
