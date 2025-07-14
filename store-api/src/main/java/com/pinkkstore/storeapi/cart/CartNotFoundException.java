package com.pinkkstore.storeapi.cart;

import org.springframework.security.core.Authentication;

public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(Long cartId, Authentication authentication) {
        // TODO change .getName() to id.
        super("User: " + authentication.getName() + " was trying to fetch cart with id: " + cartId);
    }
}
