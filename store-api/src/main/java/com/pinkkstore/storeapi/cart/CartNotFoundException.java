package com.pinkkstore.storeapi.cart;

import org.springframework.security.core.Authentication;

public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(Authentication authentication) {
        // TODO change .getName() to id.
        super("User: " + authentication.getName() + " failed to find cart.");
    }
}
