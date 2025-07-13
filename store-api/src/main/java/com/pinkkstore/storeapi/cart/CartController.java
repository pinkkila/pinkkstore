package com.pinkkstore.storeapi.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/carts")
public class CartController {
    private final CartService cartService;
    
    @PostMapping
    private ResponseEntity<Cart> addCart(@RequestBody NewCartRequest newCartRequest, Authentication authentication, UriComponentsBuilder ucb) {
        var cart = cartService.createNewCart(newCartRequest, authentication);
        var newId = cart.getId();
        URI locationOfNewCart = ucb
                .path("/comments/{id}")
                .buildAndExpand(newId)
                .toUri();
        return ResponseEntity.created(locationOfNewCart).body(cart);
    }
    
}
